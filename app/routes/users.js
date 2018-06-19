var express = require('express');
var router = express.Router();
 
// Registration
router.get('/signup', function(req, res){
	res.render('signup');
});

// Login
router.get('/signin', function(req, res){
	res.render('signin');
});

module.exports = router;