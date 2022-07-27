const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resourceSchema = new Schema({
  title:{ type: String, required: true },
  tags: String,
  source: String,
});
    
module.exports = model("Resource", resourceSchema);

