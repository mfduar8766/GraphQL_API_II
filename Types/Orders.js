const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require("../graphQLTypes");
const CustomerType = require("./Customers");

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    customer: { type: CustomerType }
  })
});

module.exports = OrderType;
