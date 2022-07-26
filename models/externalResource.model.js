const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ExternalResourceSchema = new Schema({
  title:{ type: String, required: true },
  description: String,
  tags: String,
  // subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  source: String,
});
    
module.exports = model("ExternalResource", ExternalResourceSchema);