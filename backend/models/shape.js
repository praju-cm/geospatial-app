const mongoose = require('mongoose');

const ShapeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  geometry: { type: Object, required: true },
  properties: { type: Object, required: true }
});

module.exports = mongoose.model('Shape', ShapeSchema);
