var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dreamjournal');

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