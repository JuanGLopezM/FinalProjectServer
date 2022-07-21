const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const resourceSchema = new Schema({
  tags: String,
  // subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
  source: String,
});
    
module.exports = model("Resource", resourceSchema);

