var Session = require('supertest-session')({
	app:require('./app')
});

describe('access restricted sites', function(){
	
	before(function(){
		this.sess = new Session();
	});

	after(function(){
		this.sess.destroy();
	});

	it('fail to access', function(done){
		this.sess.get('/list')
			.expect(302)
			.end(done);
	});	

	it('should sign in', function(done){
		this.sess.post('/login')
			.send('user=sai&password=sai')
			.expect(302)
			.end(done);
	});

	it('should access restricted site', function(done){
		this.sess.get('/list')
			.expect(200)
			.end(done)
	});

	it('should list dreams by things', function(done){
		this.sess.post('/filterByThings')
			.send('things=cell phone')
			.expect(200)
			.end(done);
	});

	it('should list dreams by places', function(done){
		this.sess.post('/filterByPlaces')
			.send('places=hyderabad')
			.expect(200)
			.end(done);
	});

	it('should list dreams by people', function(done){
		this.sess.post('/filterByPeople')
			.send('people=mom')
			.expect(200)
			.end(done);
	});

	it('should list recurring dreams', function(done){
		this.sess.get('/listRecur')
			.expect(200, done);
	});

	it('should list lucid dreams', function(done){
		this.sess.get('/listLucid')
			.expect(200, done);
	});

	it('should list nightmares', function(done){
		this.sess.get('/listNightmare')
			.expect(200, done);
	});

});