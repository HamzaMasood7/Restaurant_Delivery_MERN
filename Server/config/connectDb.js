const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Mongodb Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDb;
