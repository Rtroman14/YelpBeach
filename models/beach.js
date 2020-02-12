const mongoose = require('mongoose');

// SCHEMA SETUP
const beachSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	cost: Number,
	location: String,
	lat: Number,
	lng: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"	// model that is referenced in the database
		}
	]
});

module.exports = mongoose.model('Beach', beachSchema);