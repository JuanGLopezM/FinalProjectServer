const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const sectionSchema = new Schema({
  title: { type: String, required: true },
  tags: String,
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
});

module.exports = model("Section", sectionSchema);