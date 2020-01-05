const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("../graphQLTypes");

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    customerId: { type: new GraphQLNonNull(GraphQLString) },
    orders: {
      type: new GraphQLList(OrderType)
    }
  })
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    customerId: { type: new GraphQLNonNull(GraphQLString) },
    customer: { type: CustomerType }
  })
});

module.exports = {
  CustomerType,
  OrderType
};
