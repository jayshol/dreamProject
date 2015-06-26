var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var models = require('./models');
var User = mongoose.model('users');


function Users(){



	this.addUser = function(username, password, email, callBack){
		"use strict";

		var salt = bcrypt.genSaltSync();
		var password_hash = bcrypt.hashSync(password, salt);

		var userItem = {
					_id : username,
					password: password_hash,
					email : email
		};

		User.create(userItem, function(err, newUser){
			if(!err){
				console.log('User inserted');
				console.log(newUser);
				return callBack(null, newUser);
			}
			callBack(err, null);
		});

	};

	this.validateLogin = function(username, password, callBack){
		"use strict";

		User.findOne({'_id':username}, function(err, user){
			if(err) return callBack(err, null);
			if(user){
				if(bcrypt.compareSync(password, user.password)){
					callBack(null, user);
				}else{
					var invalid_password_error = new Error('Invalid_password');

					invalid_password_error.invalid_password = true;
					callBack(invalid_password_error, null);
				}
			}else{
				var no_such_user_error = new Error("User :" + user + "does not exist");
				no_such_user_error.no_such_user = true;
				callBack(no_such_user_error, null);
			}
		});
	};


}

module.exports.Users = Users;