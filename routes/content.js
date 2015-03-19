var DreamObj = require('./dreams').Dreams;
var validator = require('validator');

function Content(){

	var dreams = new DreamObj();

	this.displayMainPage = function(req, res, next){
		res.render('login');
	}

	this.displayAddDreamPage = function(req, res, next){
		if(req.username){
			res.render('add', { layout: 'subMain.hbs'});
		}else{
			res.redirect('/login');
		}
	}

	function makeArray(txtString) {
		var newArray = [];
		var elements = txtString.split(',');
		for(var i=0;i<elements.length;i++){
			if(newArray.indexOf(elements[i] !== -1) && elements[i] !== ''){
				newArray.push(elements[i]);
			}
		}
		return newArray;

	}

	this.handleDreamEntry = function(req, res, next){
		"use strict";		
		var escaped_content = validator.escape( req.body.content);
		escaped_content = escaped_content.replace(/\r?\n/g,'<br>');
		//console.log(req.body.lucid);

		var dreamObj = {
			username: req.username,
			title : req.body.title,
			content : escaped_content,
			date : new Date(req.body.date),
			recurring : (typeof req.body.recur === 'undefined')? false : req.body.recur,
			lucid : (typeof req.body.lucid === 'undefined') ? false : req.body.lucid,
			nightmare : (typeof req.body.nightmare === 'undefined') ? false : req.body.nightmare,
			mood : makeArray(req.body.mood),
			things : makeArray(req.body.things),
			people : makeArray(req.body.people),
			places : makeArray(req.body.places),
			role : (typeof req.body.role === 'undefined') ? false : req.body.role,
			pvt: (typeof req.body.private === 'undefined') ? false : req.body.private
		};

		dreams.addDream(dreamObj, function(err, newDream){
			if(err) return next(err);
		// TODO: redirect the page the listing of dreams.
			res.redirect('/list');
		});

	}

	this.displayDreamsByUser = function(req, res, next){

		var username = req.username;
		if(!username){
			return res.redirect('/login');
		}	
		
		dreams.findDreamsByQuery({username: username}, function(err, dreams){
			if(err) return next(err);
			//console.log(dreams);
			res.render('listDreams', {
				username: username,
				myDreams : dreams,				
			layout:'subMain.hbs'});
		});
	}

	this.displayDreamsByThings = function(req,res, next){
		res.render('filter',{layout:'subMain.hbs'});
	}

	this.filterDreamsByThings = function(req, res, next){
		var username = req.username;
		if(!username) return res.redirect('/login');

		var things = req.body.things;
		console.log(things);

		dreams.findDreamsByQuery({username:username, things: things}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams',{
				username: username,
				myDreams:dreams,
				layout:'subMain.hbs'
			});
		});
	}

	this.displayRecurringDreams = function(req, res, next){
		var username = req.username;
		if(!username){
			return res.redirect('/login');
		}

		dreams.findDreamsByQuery({username:username, recurring :true}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams',{
				username: username,
				myDreams:dreams,
				layout:'subMain.hbs'
			});
		});
	}

	this.displayWelcomePage = function(req, res, next){
		res.render('welcome', {layout:'subMain.hbs'});
	}
}

module.exports = Content;