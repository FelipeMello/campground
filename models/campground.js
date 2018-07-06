const mongoose = require("mongoose");

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//compiling into a model
module.exports = mongoose.model("Campground", campgroundSchema);