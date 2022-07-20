const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  title: String,
  description: String,
  tags: String,
  resources: Array,
});

module.exports = model("Subject", subjectSchema);

