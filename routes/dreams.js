var mongoose = require('mongoose');
var models = require('../models');
var Dream = mongoose.model('dreams')


function Dreams(){

	this.addDream = function(newDreamObj, callBack){

		Dream.create(newDreamObj, function(err, newDream){
			if(err) return callBack(err, null);
			callBack(null, newDream);
		});

	};

	this.findDreamsByUser = function(userObj, callBack){

		Dream.find(userObj, function(err, results){
			if(err) return callBack(err, null);

			callBack(null, results);
		});
	}

	this.findDreamsByMood = function(queryObj, callBack){

		Dream.find(queryObj, function(err, results){
			if(err) return callBack(err,null);

			callBack(null, results);
		});
	}

	this.findDreamsByPlaces = function(queryObj, callBack){
		Dream.find(queryObj, function(err, results){
			if(err) return callBack(err, null);

			callBack(null, results)
		});		
	}

	this.findDreamsByThings = function(queryObj, callBack){
		Dream.find(queryObj, function(err, results){
			if(err) return callBack(err, null);

			callBack(null, results);
		});
	}

	this.findDreamsbyDate = function(queryObj, callBack){
		Dream.find(queryObj, function(err, results){
			if(err) return callBack(err, null);
			callBack(null, results);
		});
	}
	
	this.findDreamsByQuery = function(queryObj, callBack){
		Dream.find(queryObj, function(err, results){
			if(err) return callBack(err, null);
				callBack(null, results);			
		});
	}

}

module.exports.Dreams = Dreams;