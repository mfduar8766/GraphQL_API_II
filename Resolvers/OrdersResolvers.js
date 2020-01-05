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

const editOrder = async (parentValue, args) => {
  const { _id, name, price } = args;
  try {
    const order = await OrderModel.findByIdAndUpdate({
      id: _id,
      update: { name, price }
    });
    return order;
  } catch (error) {
    return errorMessage(500, "Could not update customer.");
  }
};

const deleteOrder = async (parentValue, args) => {
  const { _id } = args;
  try {
    const deleteOrder = await OrderModel.findByIdAndDelete(_id);
    const deleteCustomer = await CustomerModel.findByIdAndDelete(_id);
    return { deleteOrder, deleteCustomer };
  } catch (error) {
    return errorMessage(500, "Could not delete customer.");
  }
};


module.exports = {
  getOrders,
  getOrderById,
  addNewOrder,
  editOrder,
  deleteOrder
};
