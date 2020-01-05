const express = require("express");
const bodyParser = require("body-parser");
const GraphQLHTTP = require("express-graphql");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const schema = require("./schema");
const mongoose = require('mongoose');
const mongoURI = require("./config");
const app = express();

mongoose.connect(process.env.MONGODB_URI || mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  GraphQLHTTP({
    schema,
    graphiql: true
  })
);
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
