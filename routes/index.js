
var Session = require('./session');
var Content = require('./content');

module.exports = exports = function(app){

	var sessionObj = new Session();
	var contentObj = new Content();

	app.use(sessionObj.isUserLoggedIn);
	

	app.get('/', contentObj.displayMainPage);

	app.route('/login')
		.get(sessionObj.displayLoginPage)
		.post(sessionObj.handleLogin);

	// app.get('/login', sessionObj.displayLoginPage);
	// app.post('/login', sessionObj.handleLogin);	
	
	// handling sign up
	app.route('/signup')
		.get(sessionObj.displaySignUpPage)
		.post(sessionObj.handleSignUp);
	// app.get('/signup', sessionObj.displaySignUpPage);
	// app.post('/signup', sessionObj.handleSignUp);

	app.route('/add')
		.get(contentObj.displayAddDreamPage)
		.post(contentObj.handleDreamEntry);
	// app.get('/add', contentObj.displayAddDreamPage);
	// app.post('/add', contentObj.handleDreamEntry);

	app.get('/cancel', contentObj.displayDreamsByUser);

	app.route('/edit/:id')
		.get(contentObj.displayEditDream)
		.post(contentObj.handleDreamUpdate);
	// app.get('/edit/:id', contentObj.displayEditDream);
	// app.post('/edit/:id', contentObj.handleDreamUpdate);

	app.get('/list', contentObj.displayDreamsByUser);
	app.get('/listThings', contentObj.displayDreamsByThings);
	app.post('/filterByThings', contentObj.filterDreamsByThings);
	
	app.get('/listRecur', contentObj.displayRecurringDreams);
	app.get('/listLucid', contentObj.displayLucidDreams);
	app.get('/listNightmare', contentObj.displayNightmares);

	app.get('/listPlaces', contentObj.displayListPlaces);
	app.post('/filterByPlaces', contentObj.filterDreamsByPlaces);

	app.get('/listPeople', contentObj.displayListPeople);
	app.post('/filterByPeople', contentObj.filterDreamsByPeople);

	app.get('/listMoods', contentObj.displayListMoods);
	app.post('/filterByMood', contentObj.filterDreamsByMood);

	app.get('/welcome', contentObj.displayWelcomePage);

	app.get('/publicDreams', contentObj.displayPublicDreams);
	app.get('/signOut', sessionObj.handleSignOut);

}