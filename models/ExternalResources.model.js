const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ExternalResourceSchema = new Schema({
  title:{ type: String, required: true },
  description: String,
  tags: String,
  source: String,
});
    
module.exports = model("ExternalResource", ExternalResourceSchema);