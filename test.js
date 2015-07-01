var request = require('supertest');
var app = require('./app');

describe('Requests root path', function(){
	it('requests login page', function(done){
		request(app)
			.get('/login')
			.expect(200, done);
	});

	it('requests login content', function(done){
		request(app)
			.get('/login')
			.expect('Content-Type', /html/, done);
	})
})