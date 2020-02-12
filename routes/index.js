const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');


// root route
router.get('/', function (req, res) {
	res.render('landing');
});


// show register form
router.get("/register", function (req, res) {
	res.render("register", { page: 'register' });
});

// show login form
router.get("/login", function (req, res) {
	res.render("login", { page: 'login' });
});


// handle register logic
router.post('/register', function (req, res) {
	const newUser = new User({ username: req.body.username })
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register", { error: err.message });
		}
		passport.authenticate('local')(req, res, function () {
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect('/beaches');
		});
	});
});


// handle login form
router.post('/login', passport.authenticate('local', {
	successRedirect: '/beaches',
	failureRedirect: '/login'
}), function (req, res) {
});


// logout logic
router.get('/logout', function (req, res) {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect('/beaches');
});


module.exports = router;