const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const appRoutes = require("./routes/routes");

const connectDb = require("./config/connectDb");
//const { seedData } = require("./seeder/seed");
connectDb();

app.use("/", appRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
