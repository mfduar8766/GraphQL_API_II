const dotEnv = require("dotenv");
dotEnv.config();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;
module.exports = {
  MONGODB_URI: `mongodb://${USERNAME}:${PASSWORD}${URL}`
};
