
var Session = require('./session');
var Content = require('./content');

module.exports = exports = function(app){

	var sessionObj = new Session();
	var contentObj = new Content();

	app.use(sessionObj.isUserLoggedIn);

	

	app.get('/', contentObj.displayMainPage);

	app.get('/login', sessionObj.displayLoginPage);
	app.post('/login', sessionObj.handleLogin)
	
	// handling sign up
	app.get('/signup', sessionObj.displaySignUpPage);
	app.post('/signup', sessionObj.handleSignUp);

	app.get('/add', contentObj.displayAddDreamPage);
	app.post('/add', contentObj.handleDreamEntry);

	app.get('/list', contentObj.displayDreamsByUser);
	app.get('/listThings', contentObj.displayDreamsByThings);
	app.post('/filterByThings', contentObj.filterDreamsByThings)
	
	app.get('/listRecur', contentObj.displayRecurringDreams);

	app.get('/welcome', contentObj.displayWelcomePage);

	app.get('/signOut', sessionObj.handleSignOut);

}