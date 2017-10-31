 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 //create schema
 const IdeaSchema = new Schema({
 	title:{
 		type: String,
 		required: true
 	},
 	details:{
 		type: String,
 		require: true
 	},
 	user:{
 		type: String,
 		required: true
 	},
 	date:{
 		type: Date,
 		default: Date.now
 	}
 });

 mongoose.model('ideas', IdeaSchema);