var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var socketManager = require('./modules/socket-manager.js');

users = [];
connections = [];
sockets = [];

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.port || 3000);
console.log('\t\t\tServer listening on port 3000\n');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {    
    res.sendFile(__dirname + '/admin.html');
});

io.sockets.on('connection', function(socket){   
    // debug(socket);
    sockets.push(socket);
    
    // register
    socket.on('sign up', function(data,callback){
        var username = data.username;
        var email = data.email;
        var pwd = data.pwd1;
        var pwd2 = data.pwd2;
        var admin = data.admin || false;        
        if (pwd.toString().trim() === pwd2.toString().trim()) {
            socket.username = username;
            socket.email = email;
            socket.pwd = pwd;
            if (!data.admin) {
                connections.push({id:socket.id,username:socket.username,email:socket.email}); 
            }    
            updateConnections();
            socketManager.add(socket,function(stat){
                console.log('Registration status: ' + stat.success);
                if (stat.success) {
                    callback({success:true});
                    console.log('Registered: ' + ' User ' + username + ' Email ' + email + ' Password 1: ' + pwd + ' Password Confirmed: ' + pwd2 + ' with ID ' + socket.id);
                    console.log(socketManager.list().length + ' connections');
                } else {
                    callback(stat);
                }   
            });
        } else {
            callback({success:false,error:"Passwords don't match"});
        }
    });
    
    // disconnect
    socket.on('disconnect', function(data){
        socketManager.find(socket.username, function(stat){
            if (stat.success) {
                socketManager.remove(socket.username);                
            }
        });
        
        var index = users.findIndex(x => (x.username === socket.username));
        if (index !== -1) {
            users.splice(index, 1);
            updateUsers();       
        }    

        var conn = connections.findIndex(x => (x.username === socket.username));
        if (conn !== -1) {
            connections.splice(conn,1);
            updateConnections();
        }
        
        var sock = sockets.findIndex(x => (x.id === socket.id));
        if (sock !== -1) {
            sockets.splice(sock,1);
        }
        
        console.log(socketManager.list().length + ' connections');
    });
    
    // login
    socket.on('login', function(data, callback){
        var username = data.username;
        var pwd = data.pwd.toString().trim();
        var admin = data.admin || false;
        var user = null;
        
        try {
            if (username === 'admin' && pwd === 'adminuser') {
                callback({success:true});
                updateUsers();
            }
            
            if (username.trim().toLowerCase() === socket.username.trim().toLowerCase() || 
                username.trim().toLowerCase() === socket.email.trim().toLowerCase()) {
                console.log('Logging in user ' + username + ' with ID ' + socket.id);
                
                socketManager.find(username,function(stat){
                    if (stat.success) {
                        if (stat.found.pwd.trim().toLowerCase() === pwd.trim().toLowerCase()) {
                            if (!admin) {
                                if (!stat.found.signedIn) {
                                    callback({success:true,username:stat.found.username});
                                    stat.found.signedIn = true;
                                    users.push(stat.found);
                                    updateUsers();
                                    console.log('Logged in: ' + username + ' Using Password: ' + pwd);
                                } else {
                                    callback({success:false,error:'User currently signed in'});
                                }
                            }
                        } else {
                            callback({success:false,error:'Invalid username or password'});
                        }
                    } else {
                        callback(stat);
                    }
                });            
            } else {
                callback({success:false,error:"Invalid username or password"});
            }
        } catch (error) {
            callback({success:false,error:'Bad username or password'});
        }
    });
    
    // logout
    socket.on('log out', function(data){
        var index = users.findIndex(x => (x.username === socket.username || x.email === socket.email));
        if (index !== -1) {
            users[index].signedIn = false;
            users.splice(index,1);
            var count = '';
            
            switch(users.length) {
                case 1: count = ' user';break;
                default: count = ' users';break;
            }
            
            console.log(users.length + ' logged on' + count);
            updateUsers();
        }
    });
       
    // send message
    socket.on('send message', function(data) {
        var name = '';
        // data.user || socket.username
        
        var index = users.findIndex(x => (x.id.trim().toLowerCase() == data.user.trim().toLowerCase()));
        // console.log(data.user);
        if (index !== -1) {
            name = users[index].username;
        } else {
            name = socket.username || data.user;
        }
        
        io.sockets.emit('new message', {msg:data.message, user: name});
    });

    // message to specific user
    socket.on('specific', function(data){
        var user = data.user;
        var msg = data.message;
        // console.log('\n\n\t\tUser: ' + user + ' Message: ' + msg + '\n\n');
        var socketIndex = sockets.findIndex(x => (x.id === user));
        if (socketIndex !== -1) {
            var s = sockets[socketIndex];
            s.emit('receive specific message',{'from':socket.username || 'Admin','message':msg});
        }
    });
    
    // user list
    function updateUsers() {
        io.sockets.emit('get users', users);
    }
    
    // connection list
    function updateConnections() {
        io.sockets.emit('get connections', connections);
    }
        
    // server broadcast message
    socket.on('broadcast', function(data){
        console.log('Broadcast Message: ' + data.message + '  Fade Time: ' + data.time + ' Message Level: ' + data.level);
        io.sockets.emit('receive server message', {'from':'Admin','message':data.message,'time':data.time,'level':data.level.toLowerCase()});
    });
    
    // remote user logout
    socket.on('user logout',function(data){
        var who = data.who || false;
        
        if (who) {
            switch(who) {
                case 'user':
                    logoutUser(data.id);
                    break;
                    
                default:
                    logoutUsers();
                    break;
            }
        }
    });
    
    // remote user disconnect
    socket.on('user disconnect', function(data){
       var who = data.who || false;
       
       if (who) {
           switch(who) {
               case 'user':
                    disconnectUser(data.id);
                break;
                
                default:
                    disconnectUsers();
                    break;
           }
       }
    });
       
    /*  Admin methods */
    function logoutUser(id) {
        console.log('Admin logged out user with id: ' + id);
        sockets[sockets.findIndex(x => (x.id == id))].emit('log me out');
    }
    
    function logoutUsers() {
        
    }
    
    function disconnectUser(id) {
        console.log('Admin disconnected user with id: ' + id);
        sockets[sockets.findIndex(x => (x.id == id))].emit('disconnect me');
        updateConnections();
    }
    
    function disconnectUsers() {
        
    }
});

function debug(socket) {
    socket.use(function(packet, next){
        for (var p in packet) {
            var objP = packet[p];
            if (objP instanceof Object) {
                for (var x in objP) {
                    var objY = objP[x];
                    console.log(x + ': ' + objY);
                }
            } else {
                console.log(p + ': ' + objP);
            }
        }
        next();
    });
}