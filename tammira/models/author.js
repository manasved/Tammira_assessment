const mongoose = require("mongoose");
const DBCONSTANTS = require("../constants/dbConstants")

const { Schema } = mongoose;

const AuthorSchema = new Schema({
    _id: mongoose.ObjectId,
    first_name: String,
    last_name: String,
    bio: String,
    profile_pic_url: String
});

const Author = mongoose.model(DBCONSTANTS.MONGO_USER_COLLECTION, AuthorSchema);

module.exports = { Author, AuthorSchema };