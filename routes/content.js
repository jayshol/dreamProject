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

	function createDreamObject(req){
		"use strict";

		var escaped_content = validator.escape( req.body.content);
		escaped_content = escaped_content.replace(/\r?\n/g,'<br>');
		console.log(req.body.content);

		var dreamObj = {
			username: req.username,
			title : makeArray(req.body.title)[0],
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

		return dreamObj;


	}

	this.handleDreamEntry = function(req, res, next){
		"use strict";		
		
		var newDreamObj = createDreamObject(req);

		dreams.addDream(newDreamObj, function(err, newDream){
			if(err) return next(err);
		// TODO: redirect the page the listing of dreams.
			res.redirect('/list');
		});

	}

/*	this.displayDreamsByUser = function(req, res, next){

		var username = req.username;
		if(!username){
			return res.redirect('/login');
		}else{	
		
			dreams.findDreamsByQuery({username: username}, function(err, dreams){
				if(err) return next(err);
				//console.log(dreams);
				res.render('listDreams', {
					usrname: username,
					myDreams : dreams,				
				layout:'subMain.hbs'});
			});
		}
	} */

	this.displayDreamsByUser = function(req, res, next){
		var queryObj = {};
		getDataFromDatabase(req, res, queryObj);
	}

	this.displayListMoods = function(req, res, next){
		res.render('filter', {
			filter:'mood',
			action:'filterByMood',
			layout:'subMain.hbs'
		});
	}

	this.filterDreamsByMood = function(req, res, next){				
		var queryObj = {
			mood:req.body.mood
		};

		getDataFromDatabase(req, res, queryObj);
	}

	function getDataFromDatabase(req, res, queryObj){
		var username = req.username;
		if(!username){
			res.redirect('/login');
		}

		queryObj.username = username;

		dreams.findDreamsByQuery(queryObj, function(err, dreams){
			if(err) return next(err);
			var dataObject = {
				usrname:username,
				myDreams:dreams,				
				layout:'subMain.hbs'			
			}
			if(!dreams.length){
				dataObject.message = "No dreams found.";
			}
			res.render('listDreams', dataObject);
		});

	}

	this.displayListPlaces = function(req, res, next){
		res.render('filter',{
			filter: 'places',
			action:'filterByPlaces',
			layout:'subMain.hbs'
		});
	}

	this.filterDreamsByPlaces = function(req, res, next){
		var queryObj = {
			places: {'$regex':req.body.places}
		}

		getDataFromDatabase(req, res, queryObj);
	}

/*	this.filterDreamsByPlaces = function(req, res, next){
		var username = req.username;
		if(!username){
			res.redirect('/login');
		} else{

			var places = req.body.places;
			dreams.findDreamsByQuery({username:username, places:places}, function(err, dreams){
				if(err) return next(err);
				res.render('listDreams', {
					username:username,
					myDreams:dreams,
					layout:'subMain.hbs'
				});
			});
		}
	} */

/*	this.filterDreamsByMood = function(req, res, next){
		var username = req.username;
		if(!username){
			res.redirect('/login');
		}
		var mood = req.body.mood;
		dreams.findDreamsByQuery({username:username, mood:mood}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams', {
				username:username,
				myDreams:dreams,
				layout:'subMain.hbs'
			});
		});
	}  */

	this.displayListPeople = function(req, res, next){
		res.render('filter', {
			filter:'people',
			action:'filterByPeople',
			layout:'subMain.hbs'
		});
	}

	this.filterDreamsByPeople = function(req, res, next){
		var queryObj = {
			people:req.body.people
		}

		getDataFromDatabase(req, res, queryObj);
	}

/*	this.filterDreamsByPeople = function(req, res, next){
		var username = req.username;
		if(!username){
			res.redirect('/login');
		}

		var people = req.body.people;
		dreams.findDreamsByQuery({username:username, people:people}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams', {
				username:username,
				myDreams:dreams,
				layout:'subMain.hbs'
			});
		});

	} */

	this.displayDreamsByThings = function(req,res, next){
		res.render('filter',{
			filter:'things',
			action:'filterByThings',
			layout:'subMain.hbs'});
	}

	this.filterDreamsByThings = function(req, res, next){		
		var queryObj = {
			things:{'$regex':req.body.things}
		}
		getDataFromDatabase(req, res, queryObj);
	}

	/*
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

	*/

	this.displayRecurringDreams = function(req, res, next){
		var queryObj = {
			recurring:true
		}
		getDataFromDatabase(req, res, queryObj);
	}

/*	this.displayRecurringDreams = function(req, res, next){
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
	} */

	this.displayLucidDreams = function(req, res, next){
		var queryObj = {
			lucid:true
		}

		getDataFromDatabase(req, res, queryObj);
	}

/*	this.displayLucidDreams = function(req, res, next){
		var username = req.username;
		if(!username){
			res.redirect('/login');			
		}

		dreams.findDreamsByQuery({username:username, lucid:true}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams', {
				username:username,
				myDreams: dreams,
				layout:'subMain.hbs'
			});
		});
	} */

	this.displayNightmares = function(req, res, next){
		var queryObj = {
			nightmare:true
		}
		getDataFromDatabase(req, res, queryObj);
	}

/*	this.displayNightmares = function(req, res, next){
		var username = req.username;
		if(!username){
			res.redirect('/login');
		}

		dreams.findDreamsByQuery({username:username, nightmare:true}, function(err, dreams){
			if(err) return next(err);
			res.render('listDreams', {
				username:username,
				myDreams: dreams,
				layout:'subMain.hbs'
			});
		});
	}  */

	this.displayWelcomePage = function(req, res, next){
		res.render('welcome', {layout:'subMain.hbs'});
	}

	this.displayPublicDreams = function(req, res, next){
		//res.send('public dreams');
		dreams.findDreamsByQuery({pvt:false}, function(err, dreams){
			if(err) return next(err);

			res.render('listDreams', {
				usrname:'public',
				myDreams: dreams,
				layout:'subMain.hbs'
			});
		});
	}

	this.displayEditDream = function(req, res, next){
		var id = req.params.id;
		var username = req.username;

		dreams.findDreamsByQuery({username:username, _id:id}, function(err, dream){
			if(err) return next(err);
			var dreamObj = makeDataObject(dream[0]);			
			console.log(dreamObj);
			
			res.render('edit', {
				username:username,
				dream:dreamObj,
				layout:'subMain.hbs'
			});

		});
	}	

	function makeDataObject(data){
		var dataObj = {};

		for(var i in data._doc){			
			//console.log(typeof data._doc[i]);
			if(Array.isArray(data._doc[i]) && data._doc.hasOwnProperty(i)){
				dataObj[i] = validator.escape(data._doc[i].join(","));	
			}else{									
					if(i == "date"){
						var dateObj = new Date(data._doc[i]);
						var month = ((dateObj.getMonth() + 1) >= 10) ? (dateObj.getMonth() + 1) : "0" + (dateObj.getMonth() + 1);
						var date = ((dateObj.getDate() + 1) >= 10) ? (dateObj.getDate() + 1) : "0" + (dateObj.getDate() + 1);
						var dateString = dateObj.getFullYear() + '-' + month + '-' + date;
						//console.log(dateString);
						dataObj[i] = dateString;
					}else{
						dataObj[i] = data._doc[i];
					}
			}
			
			
		}

		return dataObj;
	}

	this.handleDreamUpdate = function(req, res, next){

		var dreamID = req.params.id;

		var editedDreamObj = createDreamObject(req);
		editedDreamObj['_id'] = dreamID;

		dreams.updateDream({_id: dreamID}, editedDreamObj, function(err, updated){
			if(err) return next(err);

			//redirect to the listing of the dreams
			res.redirect('/list');
		});

	}
}

module.exports = Content;