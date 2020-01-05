const { mongoose, CustomerModel, OrderModel } = require("../globalImports");
const errorMessage = (status, message) => ({ status, message });

const getOrders = async () => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $lookup: {
          from: CustomerModel.collection.name,
          localField: "customerId",
          foreignField: "customerId",
          as: "customer"
        }
      },
      { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } }
    ]);
    return orders;
  } catch (error) {
    return errorMessage(500, "Could not get orders.");
  }
};

const getOrderById = async (parent, args) => {
  const { _id } = args;
  console.log("ORDER BY ID PARENT", parent);
  console.log("ORDER BY ID ARGS", args);
  try {
    const order = await OrderModel.findById(_id);
    if (!order) {
      return errorMessage(500, "Could not get order.");
    }
    return order;
  } catch (error) {
    return errorMessage(500, "Could not get order.");
  }
};

const addNewOrder = async (parent, args) => {
  const { name, price, customerId } = args;
  try {
    const orderModel = new OrderModel({
      _id: mongoose.Types.ObjectId(),
      name,
      price,
      customerId
    });
    const newOrder = await orderModel.save();
    const response = newOrder;
    return response;
  } catch (error) {
    return errorMessage(500, "Could not get order.");
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addNewOrder,
};
