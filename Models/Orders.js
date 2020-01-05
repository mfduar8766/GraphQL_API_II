const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  customerId: String,
  name: String,
  price: Number,
  customer: { type: Schema.Types.ObjectId, ref: "Customer" }
});

module.exports = mongoose.model("Order", OrderSchema);
