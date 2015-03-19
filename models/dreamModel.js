var mongoose = require('mongoose');

var dreamSchema = mongoose.Schema({
	username: String,
	title: String,
	content: String,
	date:Date,	
	recurring: Boolean,	
	lucid: Boolean,
	nightmare: Boolean,
	mood: [],
	things: [],
	people: [],
	places:[],
	role:Boolean,
	pvt:Boolean
});

var DreamModel = mongoose.model('dreams', dreamSchema);

module.exports = DreamModel;