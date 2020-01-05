const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  customerId: String,
  email: String,
  age: Number,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

module.exports = mongoose.model("Customer", CustomerSchema);
