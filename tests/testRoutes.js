var request = require('supertest');
var app = require('./../app.js');

describe('Requests to the root path', function(){
	it('Returns  200 status code', function(done){
		request(app)
			.get('/')
			.expect(200, done);
	});

	it('Returns content-type html', function(done){
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);
	});

	it('Checks for a word in the page', function(done){
		request(app)
			.get('/')
			.expect(/Dream Company/, done);
	});	
});

describe('Requests login page', function(done){
	it('Checks the login page', function(done){
		request(app)
			.get('/login')
			.expect(200, done);
	});
	
	it('Requests login page', function(done){
		request(app)
			.get('/login')
			.expect('Content-Type', /html/, done);
	});

	it('Logs in an user', function(done){
		request(app)
			.post('/login')
			.send('user=sai&password=sai')
			.expect(302, done);
	});

	it('Checks for invalid password', function(done){
		request(app)
			.post('/login')
			.send('user=sai&password=some')
			.expect(/Invalid password/i, done);
	});

	it('Checks for invalid user', function(done){
		request(app)
			.post('/login')
			.send('user=some&password=some')
			.expect(/No such user exists/i, done);
	});
});

describe('Lists Dreams', function(){
	
	it('Lists all dreams', function(done){
		request(app)
			.get('/list')
			.expect(302, done);
	});

	it('Lists dreams by things', function(done){
		request(app)
			.get('/listThings')
			.expect(200, done);
	});

	it('Lists dreams by places', function(done){
		request(app)
			.get('/listPlaces')
			.expect(200, done);
	});

	it('Lists dreams by people', function(done){
		request(app)
			.get('/listPeople')
			.expect(200, done);
	});

	it('Lists dreams by moods', function(done){
		request(app)
			.get('/listMoods')
			.expect(200, done);
	});

	it('Filter dreams by things', function(done){
		request(app)
			.post('/filterByThings')
			.expect(302, done);
	});

	it('Filters dreams by places', function(done){
		request(app)
			.post('/filterByPeople')
			.expect(302, done);
	});

	it('Filters dreams by moods', function(done){
		request(app)
			.post('/filterByMood')
			.expect(302, done);
	});	
	
});

describe('Lists General Dreams', function(){
	it('Lists recurring dreams', function(done){
		request(app)
			.get('/listRecur')
			.expect(302)
			.end(function(err){
				if(err) throw err;
				done();
			});
	});

	it('Lists lucid dreams', function(done){
		request(app)
			.get('/listLucid')
			.expect(302, done);
	});

	it('Lists nightmares', function(done){
		request(app)
			.get('/listNightmare')
			.expect(302, done);
	});	
});