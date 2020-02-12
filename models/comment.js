const mongoose = require('mongoose');

// SCHEMA SETUP
const commentSchema = new mongoose.Schema({
	text: String,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"	// model that is referenced in the database
		},
		username: String
	}
});

module.exports = mongoose.model('Comment', commentSchema);