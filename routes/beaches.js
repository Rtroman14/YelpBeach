const express = require('express'),
	router = express.Router(),
	Beach = require('../models/beach'),
	middleware = require("../middleware"),		// if require directory, it automatically require file named "index.js"
	NodeGeocoder = require('node-geocoder');

const options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

const geocoder = NodeGeocoder(options);


// INDEX - Display all beaches
router.get("/", function (req, res) {
	// Get all beaches from DB
	Beach.find({}, function (err, allBeaches) {
		if (err) {
			console.log(err);
		} else {
			res.render("beaches/index", { beaches: allBeaches, page: 'beaches' });
		}
	});
});


// CREATE - Add new beach to database
router.post("/", middleware.isLoggedIn, function (req, res) {
	// get data from form and add to beaches array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const cost = req.body.cost;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		const lat = data[0].latitude;
		const lng = data[0].longitude;
		const location = data[0].formattedAddress;
		const newBeach = { name: name, image: image, description: desc, cost: cost, author: author, location: location, lat: lat, lng: lng };
		// Create a new beach and save to DB
		Beach.create(newBeach, function (err, newlyCreated) {
			if (err) {
				console.log(err);
			} else {
				//redirect back to beaches page
				console.log(newlyCreated);
				res.redirect("/beaches");
			}
		});
	});
});


// NEW - show form to create new beach
router.get('/new', middleware.isLoggedIn, function (req, res) {
	res.render('beaches/new');
});


// SHOW - shows information about one beach
router.get('/:id', function (req, res) {
	// find beach with provided ID
	Beach.findById(req.params.id).populate("comments").exec(function (err, foundBeach) {
		if (err || !foundBeach) {
			req.flash("error", "Beach not found");
			res.redirect("back");
		} else {
			console.log(foundBeach);
			// render show template with that beach
			res.render("beaches/show", { beach: foundBeach });
		}
	});
});


// EDIT - show edit form
router.get('/:id/edit', middleware.checkBeachOwnership, function (req, res) {
	Beach.findById(req.params.id, function (err, foundBeach) {
		res.render('beaches/edit', { beach: foundBeach });
	});
});


// UPDATE - make changes to beach in database
router.put("/:id", middleware.checkBeachOwnership, function (req, res) {
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		req.body.beach.lat = data[0].latitude;
		req.body.beach.lng = data[0].longitude;
		req.body.beach.location = data[0].formattedAddress;

		Beach.findByIdAndUpdate(req.params.id, req.body.beach, function (err, beach) {
			if (err) {
				req.flash("error", err.message);
				res.redirect("back");
			} else {
				req.flash("success", "Successfully Updated!");
				res.redirect("/beaches/" + beach._id);
			}
		});
	});
});


// DESTROY - deletes beach from database
router.delete('/:id', middleware.checkBeachOwnership, function (req, res) {
	Beach.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			consol.log(err);
			res.redirect('/beaches');
		} else {
			res.redirect('/beaches');
		}
	});
});


module.exports = router;