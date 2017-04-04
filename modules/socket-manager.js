function capitalizeFirstCharacter(word) {
	var word_split = null,
		line = "";
	if (word.trim().toLowerCase() === 'id' ||
		word.trim().toLowerCase() === 'ssn' ||
		word.trim().toLowerCase() === 'sku' ||
		word.trim().toLowerCase() === 'vm' ||
		word.trim().toLowerCase() === 'mac' ||
		word.trim().toLowerCase() === 'imei' ||
		word.trim().toLowerCase() === 'os' ||
		word.trim().toLowerCase() === 'atm' ||
		word.trim().toLowerCase() === 'pa') {
		word = word.toUpperCase();
	} else if (word.match(/[-]/)) {
		if (null !== (word_split = word.split(['-'])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + '-';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else if (word.match(/[ ]/)) {
		if (null !== (word_split = word.split([' '])).length > 0) {
			for (var i = 0; i<word_split.length; i++) {
				if (i < (word_split.length - 1)) {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1) + ' ';
				} else {
					line += word_split[i].substring(0,1).toUpperCase() + word_split[i].substring(1);
				}
			}
			return line;
		}
	} else {
		return word.substring(0,1).toUpperCase() + word.substring(1);
	}
	return word;
}

function cfc(word) {
	return capitalizeFirstCharacter(word);
}

function cap(str) { return str.substring(0,1).toUpperCase() + str.substring(1); }

function log(message = '\n') {
	console.log('\n' + message + '\n');
}

function numSuf(num) {
	let index = (num.toString().length - 1);
	let n = num.toString().substring(index);
	switch (n) {
		case '1':
			return 'st';

		case '2':
			return 'nd';

		case '3':
			return 'rd';

		default:
			return 'th';
	}
}

function size(obj) {
    if (obj instanceof Array) {
        return (obj.length > 0);
    }

    if (obj instanceof Object && !(obj instanceof Array)) {
        return (Object.keys(obj).length > 0);
    }

    if (typeof(obj) === 'string') {
        return (obj.length > 0);
    }

    if (typeof(obj) === 'number') {
        return (obj.toString().length > 0);
    }

    return false;
}

function isArray(obj) {
    return (obj instanceof Array);
}

function isObject(obj) {
    return ((obj instanceof Object) && !(obj instanceof Array));
}

function isString(obj) {
    return (typeof(obj) === 'string');
}

function isNumber(obj) {
    return (typeof(obj) === 'number');
}

let SocketManager = (function(){
	let users = [];

	return function(noun, verb, callback) {
		switch (verb) {
            case 'add':
                var index = users.findIndex(x => (x.username.trim().toLowerCase() === noun.username.trim().toLowerCase()));
                if (index !== -1) {
                    return callback({success:false,error:'Username already in use'});
                }
                
                index = users.findIndex(x => (x.email.trim().toLowerCase() === noun.email.trim().toLowerCase()));
                if (index !== -1) {
                    return callback({success:false, error:'Email already in use'});
                }
                
                var newObject = {
                    id: noun.id,
                    username: noun.username,
                    email: noun.email,
                    pwd: noun.pwd,
                    signedIn:false
                };
                users.push(newObject);
                return callback({success:true});   
                
            case 'remove':
                if (noun) {
                    var index = users.findIndex(x => (x.username.trim().toLowerCase() === noun.trim().toLowerCase() ||
                        x.email.trim().toLowerCase() === noun.trim().toLowerCase() ||
                        x.id === noun));
                    users.splice(index,1);
                }
                return users;
                
            case 'find':
                if (noun) {
                    var index = users.findIndex(x => (x.username.trim().toLowerCase() === noun.trim().toLowerCase() ||
                        x.email.trim().toLowerCase() === noun.trim().toLowerCase() ||
                        x.id === noun));
                    if (index !== -1) {
                        return callback({success:true,found:users[index]});
                    } else {
                        return callback({success:false,error:noun + ' was not found'});
                    }
                } else {
                    return callback({success:false,error:'Missing find argument'});
                }
                
            case 'list':
                return users;
        }
        return null;
	}
})();

module.exports = {
	'add':(function(){
        return function(noun, callback) {
            var verb = 'add';
            return SocketManager(noun,verb,callback);
        }
    })(),
    'remove':(function(){
        return function(noun) {
            var verb = 'remove';
            return SocketManager(noun, verb, callback = null);
        }
    })(),
    'list':(function(){
        return function() {
            var verb = 'list';
            return SocketManager(noun = null, verb, callback = null);
        }
    })(),
    'find':(function(){
        return function(noun, callback) {
            var verb = 'find';
            return SocketManager(noun, verb, callback);
        }
    })()
}
