const mongoose = require("mongoose");

const connectoToMongoose = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: false,
      reconnectTries: 50,
      reconnectInterval: 500
    });
    console.log(`Connected to DB ${connection}`);
  } catch (error) {
    console.log(`ERROR ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectoToMongoose;
