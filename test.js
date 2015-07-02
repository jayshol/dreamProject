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
			.expect('Content-Type', /html/)
			.end(done)
	});

});