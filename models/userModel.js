var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	_id : String,
	password : String,
	email: String
});

var userModel = mongoose.model('users', userSchema);

module.exports = exports = userModel;