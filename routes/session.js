var UserObj = require('../users').Users;
var mongoose = require('mongoose');
var models = require('../models');
var SessionModel = mongoose.model('sessions');
var crypto = require('crypto');


function Session(){

	var users = new UserObj();

	this.isUserLoggedIn = function(req, res, next){
		var sessionId = req.cookies.session;

		getUserName(sessionId, function(err, username){			
			if(!err && username){
				req.username = username;
			}
			return next();
		});
	}

	function getUserName(sessionId, callBack){
		if(!sessionId){
			callBack(Error('session not set'), null);
			return;
		}

		SessionModel.findOne({_id:sessionId}, function(err, session){
			if(err) return callBack(err, null);

			if(!session){
				callBack(Error('Session not found'), null);
				return;
			}

			callBack(null, session.username);

		});
	}

	this.displayLoginPage = function(req, res, next){
		res.render('login');
	};

	function startSession(username, callBack){
		"use strict";
		var currentDate = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var sessionId = crypto.createHash('sha1').update(currentDate + random).digest('hex');

		var session = {username:username, _id :sessionId};

		SessionModel.create(session, function(err, result){
			if(err) callBack(err, null);
			//console.log(result);
			callBack(null, sessionId);
		});
	}

	this.handleLogin = function(req, res, next){
		"use strict";

		var username = req.body.user;
		var password = req.body.password;

		users.validateLogin(username, password, function(err, user){
			if(err){
				if(err.invalid_password){
				//	res.end('Invalid password');
					res.render("login", {errormsg: "Invalid password"});
				}else if(err.no_such_user){
				//	res.end('No such user exists');
					res.render("login", {errormsg : "No such user"});
				}
			} else{
				//console.log(user);
				startSession(user['_id'], function(err, sessionId){
					res.cookie('session', sessionId);
					//redirect to the welcome page
					//res.end('sai is here');
					res.redirect("/welcome");
				});
			}			
		});
	};

	this.displaySignUpPage = function(req, res, next){
		res.render('signUp');
	};

	function validate(username, password, email, verify, errorObj){
		"use strict";

		var USER_RE = /^[a-zA-Z0-9_-]{3,20}$/;
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

        errorObj['username_error'] = "";
        errorObj['password_error'] = "";
        errorObj['verify_error'] = "";
        errorObj['email_error'] = "";

        if(!USER_RE.test(username)){
        	errorObj['username_error'] = "Invalid username.";
        	return false;
        }
        if(!PASS_RE.test(password)){
        	errorObj['password_error'] = "Invalid password.";
        	return false;
        }
        console.log(password + '   ' + verify);
        if(password !== verify){
        	errorObj['verify_error'] = "Passwords must match.";
        	return false;
        }
        if(!EMAIL_RE.test(email)){
        	errorObj['email_error'] = "Invalid email.";
        	return false;
        }

		return true;
	}

	this.handleSignUp = function(req, res, next){
		var userName = req.body.user;
		var password = req.body.password;
		var email = req.body.email;
		var verify = req.body.verify;
		
		var errorObj = {userName:userName, email:email};
		if(validate(userName, password, email, verify, errorObj)){
			users.addUser(userName, password, email, function(err, user){
				if(err){
					if(err.code === '11000'){
						errorObj['user_error'] = "User name already in use. Please choose another.";
						return res.render('signUp', {errorObj:errorObj});
					}else {
						return next(err);
					}
				}
				console.log(user['_id']);				
				startSession(user['_id'], function(err, sessionId){
					res.cookie('session', sessionId);
					// redirect to the welcome page
					//res.end("Sai is here");
					res.redirect('/welcome');
				});				
			});

		} else {
			console.log('User did not validate.');
			console.log(errorObj);
			res.render('signUp', {errorObj:errorObj});
		}		
		//res.end(userName + " is here");
	};

	function endSession(sessionId, callBack){
		"use strict";

		SessionModel.remove({ _id : sessionId}, function(err){
			"use strict";
			callBack(err);
		});
	}

	this.handleSignOut = function(req, res, next){
		"use strict";
		var sessionId = req.cookies.session;
		console.log(sessionId);
		endSession(sessionId, function(err){
			"use strict";
			res.cookie('session', '');
			return res.redirect('/');
		});
	}
}

module.exports = Session;