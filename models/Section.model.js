const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sectionSchema = new Schema({
  title: String,
  tags: String,
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
});

module.exports = model("Section", sectionSchema);