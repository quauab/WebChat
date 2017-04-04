var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true,
        required: [true, 'Provide a username']
	},
	password: {
		type: String,
        required: [true, 'Provide a password']
	},
	email: {
		type: String,
        required: [true, 'Provide an email']
	},
	saved: {
		type: Boolean,
        required: [false]
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callBack) {
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callBack);
		});
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	});
}