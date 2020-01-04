const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} = require("./graphQLTypes");
const {
  getCustomers,
  getCustomerById
} = require("./Resolvers/CustomerResolvers");
const CustomerType = require("./Types/Customers");
const mutation = require("./Mutations/Mutations");

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
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, args) => getCustomerById(parentValue, args)
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
