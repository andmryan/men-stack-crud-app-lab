const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema({
    name: {type: String, required: true},
    family: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String}
});

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;