var express = require('express');
var app = express();
var routes = require('./routes');
var expHbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var db = require('./db');
var models = require('./models');

var hbs = expHbs.create({ extname: 'hbs', defaultLayout : 'main.hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

//middleware to access req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

routes(app);

// app.listen(9000, function(){
// 	console.log('Server listening at port 9000');
// });

module.exports = app;