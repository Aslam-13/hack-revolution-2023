const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
  veg: String,
  image: String,
  description: String,
  location: String,
  distance: Number,
})

module.exports = mongoose.model('Food', foodSchema);
