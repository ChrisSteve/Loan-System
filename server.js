var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')
var expressValidator = require('express-validator');
var flash = require('connect-flash');

var routes = require('./app/routes/index');
 
 
//For BodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
 
 
// For Passport
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
 
 
//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout'
}));
app.set('view engine', '.hbs'); 
 
// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length) {
            formParam += '['+ namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// Connect Flash
app.use(flash())

// Global Vars
app.use(function (req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.static('./public'));
 
/*app.get('/', function(req, res) { 
    res.send('Welcome to Loan System Test'); 
});*/

app.use('/', routes);
 
//Models
var models = require("./app/models");
 
//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
 
 
//load passport strategies 
require('./app/config/passport/passport.js')(passport, models.user);
 
 
//Sync Database 
models.sequelize.sync().then(function() { 
    console.log('DB Running') 
}).catch(function(err) { 
    console.log(err, "DB Update Error") 
});
 
 
app.listen(5000, function(err) { 
    if (!err) 
        console.log("Site is live");         
    else console.log(err) 
});