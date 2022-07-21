const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subjectSchema = new Schema({
  title: String,
  description: String,
  tags: String,
  // section: String, en un futuro popula sections y borramos resources
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],//Para eliminar
});

module.exports = model("Subject", subjectSchema);

