const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("../graphQLTypes");
const { CustomerType, OrderType } = require("../Types/index");
const {
  addNewCustomer,
  editCustomer,
  deleteCustomer
} = require("../Resolvers/CustomerResolvers");
const {
  addNewOrder,
  editOrder,
  deleteOrder
} = require("../Resolvers/OrdersResolvers");

const Mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parentValue, args) => addNewCustomer(parentValue, args)
    },
    editCustomerById: {
      type: CustomerType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: (parentValue, args) => editCustomer(parentValue, args)
    },
    deleteCustomerById: {
      type: CustomerType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, args) => deleteCustomer(parentValue, args)
    },
    addOrder: {
      type: OrderType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        customerId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => addNewOrder(parent, args)
    },
    editOrderById: {
      type: OrderType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        price: { type: GraphQLInt }
      },
      resolve: (parent, args) => editOrder(parent, args)
    },
    deleteOrderById: {
      type: OrderType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, args) => deleteOrder(parentValue, args)
    }
  })
});

module.exports = Mutations;
