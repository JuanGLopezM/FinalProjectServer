const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resourceSchema = new Schema({
  tags: String,
  source: String,
});
    
module.exports = model("Resource", resourceSchema);

