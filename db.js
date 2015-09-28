var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/dreamjournal');

mongoose.connect('mongodb://jayshol_my:saibaba@ds051543.mongolab.com:51543/dreams');


var db = mongoose.connection;

db.on('connected', function(){
	console.log('Database connected');
});

db.on('disconnected', function(){
	console.log('Database disconnected');
});

process.on('SIGINT', function(){
	db.close(function(){
		console.log('Database connection is closed');
		process.exit(0);
	});
});