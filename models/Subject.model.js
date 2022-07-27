const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  tags: String,
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
});

module.exports = model("Subject", subjectSchema);

