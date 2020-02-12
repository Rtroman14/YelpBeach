const Beach = require("../models/beach");
const Comment = require("../models/comment");

const middlewareObj = {}

// check if user owns beach
middlewareObj.checkBeachOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Beach.findById(req.params.id, function (err, foundBeach) {
			if (err || !foundBeach) {
				consol.log(err);
				req.flash("error", "Beach not found");
				res.redirect('back');
			} else {
				// does the user own the beach
				if (foundBeach.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect('back');
	}
};


// check if user is authorized
middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err || !foundComment) {
				req.flash("error", "Comment not found");
				res.redirect('back');
			} else {
				// does the user own the comment
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
		res.redirect('back');
	}
}


// middleware | check if logged in
middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect('/login');
}

module.exports = middlewareObj