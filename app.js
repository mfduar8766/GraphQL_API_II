const dotEnv = require('dotenv');
dotEnv.config({ path: './config.env' });
const express = require("express");
const bodyParser = require("body-parser");
const GraphQLHTTP = require("express-graphql");
const cors = require("cors");
const connectoToMongoose = require('./mongoDb');
const PORT = process.env.PORT || 5000;
const schema = require("./schema");
const app = express();

connectoToMongoose();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/graphql",
  GraphQLHTTP({
    schema,
    graphiql: false
  })
);
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
