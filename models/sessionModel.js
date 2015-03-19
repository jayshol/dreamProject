var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({	
	_id: String,
	username :String
});

var SessionModel = mongoose.model('sessions', sessionSchema);

module.exports = SessionModel;
