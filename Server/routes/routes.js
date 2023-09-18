const userRoute = require("./User");
const authRoute = require("./auth");
const itemRoute = require("./Items");
const orderRoute = require("./order");
const categoryRoute = require("./category");

const express = require("express");
const router = express.Router();

router.use("/api/user", userRoute);
router.use("/api/auth", authRoute);
router.use("/api/items", itemRoute);
router.use("/api/order", orderRoute);
router.use("/api/category", categoryRoute);

module.exports = router;
