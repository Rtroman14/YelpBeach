const express = require('express'),
	router = express.Router({ mergeParams: true }),	// merge params from beach and comments together. Share same params (Object ID)
	Beach = require('../models/beach'),
	Comment = require('../models/comment'),
	middleware = require("../middleware");		// if require directory, it automatically require file named "index.js"


// NEW ROUTE - show form to create new comment
router.get('/new', middleware.isLoggedIn, function (req, res) {
	// find beach by id
	Beach.findById(req.params.id, function (err, beach) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { beach: beach });
		}
	});
});


// CREATE ROUTE - Add new comment to database and link to beach
router.post('/', middleware.isLoggedIn, function (req, res) {
	// find beach using ID
	Beach.findById(req.params.id, function (err, beach) {
		if (err) {
			console.log(err);
			req.flash("error", "Something went wrong");
			res.redirect('/beaches');
		} else {
			// create comment
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					// add username and ID to comment Schema/Object
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					// connect commment to specific beach
					beach.comments.push(comment);	// "beach.comments" is targeting the object from /models/beach
					beach.save();
					req.flash("success", "Successfully created comment!");
					res.redirect('/beaches/' + beach._id);
				}
			});
		}
	});
});


// EDIT ROUTE - show edit comment form
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
	Beach.findById(req.params.id, function (err, foundBeach) {
		if (err || !foundBeach) {
			req.flash("error", "No beach found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				res.redirect('back');
			} else {
				res.render('comments/edit', { beach_id: req.params.id, comment: foundComment });
			}
		});
	});
});


// UPDATE ROUTE - update comment in database
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/beaches/" + req.params.id)
		}
	});
});


// DESTROY ROUTE - delete comment from database
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndDelete(req.params.comment_id, function (err) {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted!");
			res.redirect("/beaches/" + req.params.id);
		}
	});
});


module.exports = router;