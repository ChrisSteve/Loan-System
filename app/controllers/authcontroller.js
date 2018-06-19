var exports = module.exports = {} 
exports.signup = function(req, res) { 
    res.render('signup'); 
}

exports.signin = function(req, res) { 
    res.render('signin'); 
}

exports.dashboard = function(req, res) { 
    res.render('dashboard'); 
}

/*exports.home = function(req, res) { 
    res.render('index'); 
}*/

exports.logout = function(req, res) { 
    req.session.destroy(function(err) { 
        res.redirect('/'); 
    }); 
}

exports.home = function(req, res) { 
    res.render('index', { title: 'my other page', layout: 'other' }); 
}

