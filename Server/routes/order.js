const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

const auth = require("../middleware/auth");

router.get("/", auth.auth, auth.adminAuth, orderController.getAllOrders);
router.get("/:id", auth.auth, orderController.getOrderDetails);
router.get(
  "/state/:state",
  auth.auth,
  auth.adminAuth,
  orderController.getOrderByState
);
router.get("/user/:userId", auth.auth, orderController.getOrderByUserId);
router.post("/:userId", auth.auth, orderController.createOrder);
router.put("/:id", auth.auth, auth.adminAuth, orderController.updateOrder);
module.exports = router;
