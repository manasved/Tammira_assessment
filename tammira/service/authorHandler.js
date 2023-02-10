const mongoose = require("mongoose");

const { Author } = require("../models/author");



async function checkUserExist(user) {
    return await Author.findOne({ "first_name": user.first_name, "last_name": user.last_name }).exec();
}

async function createUser(user) {
    let newUser = Author.init()
    newUser = new Author({ ...user });
    newUser._id = new mongoose.Types.ObjectId();
    let savedUser = await newUser.save();
    return savedUser;
}
  

module.exports = {
    checkUserExist,
    createUser
}