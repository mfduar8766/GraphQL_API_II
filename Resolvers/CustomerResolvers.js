const { mongoose, CustomerModel } = require("../globalImports");
const data = require("../data");

const getCustomers = () => {
  return data;
  // try {
  //   const customers = await CustomerModel.find();
  //   return res.status(200).json(customers);
  // } catch (error) {
  //   return res.status(500).json({ message: "Error getting customers" });
  // }
}

const getCustomerById = (parentValue, args) => {
  const { id } = args;
  // const customer = data.filter(customer => customer.id === id);
  // return customer[0];
};

const addNewCustomer = async (parentValue, args) => {
  const { name, email, age } = args;
  // const newCustomer = new CustomerModel({
  //   _id: mongoose.Types.ObjectId(),
  //   name,
  //   email,
  //   age
  // });
  // newCustomer.save((err, customer) => {
  //   if (err) {
  //     res.status(500).json({ err, status: 500 });
  //   }
  //   res.status(201).json(customer);
  // });
  return data.push({ name, email, age });
};

const editCustomer = (parentValue, args) => {
  const { id, name, email, age } = args;
  return data.filter(customer => {
    if (customer.id === id) {
      return { ...customer, name, age, email };
    }
  })[0];
};

const deleteCustomer = (parentValue, args) =>
  data.filter(customer => customer.id !== args.id);

module.exports = {
  getCustomers,
  getCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer
};
