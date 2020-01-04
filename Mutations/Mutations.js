const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require("../graphQLTypes");
const CustomerType = require("../Types/Customers");
const {
  addNewCustomer,
  editCustomer,
  deleteCustomer
} = require("../Resolvers/CustomerResolvers");

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
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: (parentValue, args) => editCustomer(parentValue, args)
    },
    deleteCustomerById: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, args) => deleteCustomer(parentValue, args)
    }
  })
});

module.exports = Mutations;
