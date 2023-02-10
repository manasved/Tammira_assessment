const mongoose = require("mongoose");
const DBCONSTANTS = require("../constants/dbConstants")

const { Schema } = mongoose;

const BlogSchema = new Schema({
  _id: mongoose.ObjectId,
  title:  String, // String is shorthand for {type: String}
  subtitle: String,
  content: String,
  slug: String,
  tags: [String],
  created_date: Date,
  modified_date: Date,
  author: { type: 'ObjectId', ref: DBCONSTANTS.MONGO_USER_COLLECTION }
});

const Blog = mongoose.model(DBCONSTANTS.MONGO_BLOG_COLLECTION, BlogSchema);

module.exports = { Blog };