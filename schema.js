const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} = require("./graphQLTypes");
const { CustomerType, OrderType } = require("./Types/index");
const {
  getCustomers,
  getCustomerById
} = require("./Resolvers/CustomerResolvers");
const { getOrders } = require("./Resolvers/OrdersResolvers");
const mutation = require("./Mutations/index");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: () => getCustomers()
    },
    customerById: {
      type: CustomerType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => getCustomerById(parent, args)
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: () => getOrders()
    },
    orderById: {
      type: OrderType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => getOrderById(parent, args)
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
