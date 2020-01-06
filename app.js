const express = require("express");
const bodyParser = require("body-parser");
const GraphQLHTTP = require("express-graphql");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const schema = require("./schema");
const mongoose = require('mongoose');
const mongoURI = require("./config").MONGODB_URI;
const app = express();

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.log('Error', error));

mongoose.connection.once("open", () => {
  console.log("connected to DB.");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/graphql',
  GraphQLHTTP({
    schema,
    graphiql: true
  })
);
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
