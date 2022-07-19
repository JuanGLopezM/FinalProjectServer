const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  title: String,
  description: String,
  tags: String,
  resources: [{ type: Schema.Types.ObjectId, ref: "Resource" }],
});

module.exports = model("Subject", subjectSchema);

