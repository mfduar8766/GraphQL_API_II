const { mongoose, CustomerModel, OrderModel } = require("../globalImports");
const errorMessage = (status, message) => ({ status, message });

const getCustomers = async () => {
  try {
    const customers = await CustomerModel.aggregate([
      {
        $lookup: {
          from: OrderModel.collection.name,
          localField: "customerId",
          foreignField: "customerId",
          as: "orders"
        }
      },
    ]);
    return customers;
  } catch (error) {
    return errorMessage(500, "Error getting customers.");
  }
};

const getCustomerById = async (parentValue, args) => {
  const { _id } = args;
  try {
    const customer = await CustomerModel.findById(_id);
    if (!customer) {
      return errorMessage(500, 'No customer found.');
    }
    return customer;
  } catch (error) {
    return errorMessage(500, "Error getting customer.");
  }
};

const addNewCustomer = async (parentValue, args) => {
  const { name, email, age } = args;
  try {
    const customerModel = new CustomerModel({
      _id: mongoose.Types.ObjectId(),
      name,
      email,
      age
    });
    const newCustomer = await customerModel.save();
    const response = newCustomer;
    return response;
  } catch (error) {
    return { status: 500, error: "Error adding customer." };
  }
};

const editCustomer = async (parentValue, args) => {
  const { _id, name, email, age } = args;
  try {
    const customer = await CustomerModel.findByIdAndUpdate({
      id: _id,
      update: { name, email, age }
    });
    return customer;
  } catch (error) {
    return errorMessage(500, "Could not update customer.");
  }
};

const deleteCustomer = async (parentValue, args) => {
  const { _id } = args;
  try {
    const deleteCustomer = await CustomerModel.findByIdAndDelete(_id);
    return deleteCustomer;
  } catch (error) {
    return errorMessage(500, "Could not delete customer.");
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer
};
