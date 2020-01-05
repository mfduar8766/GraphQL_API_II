const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  email: String,
  age: Number
});

module.exports = mongoose.model("Customer", CustomerSchema);
