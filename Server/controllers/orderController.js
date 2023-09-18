const Order = require("../models/order");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { items, state, total } = req.body;
  const userId = req.params.userId;

  const order = await Order.create({
    userId: userId,
    items,
    state,
    total,
  });

  if (order) {
    return res.status(201).json({ message: "New order created" });
  } else {
    return res.status(400).json({ message: "Order not created" });
  }
});

module.exports = {
  createOrder,
};

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user, items, state } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID required" });
  }

  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  if (user) {
    order.user = user;
  }
  if (items) {
    order.items = items;
  }
  if (state) {
    order.state = state;
  }

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID required" });
  }

  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(400).json({ message: "Order not found" });
  }

  const result = await order.deleteOne();

  const reply = `Order ${result._id} deleted`;

  res.json(reply);
});

const getOrderDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID required" });
  }

  try {
    const order = await Order.findById(id).exec();

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order details" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().lean();

  if (!orders) {
    return res.status(400).json({ message: "No orders found" });
  }

  res.json(orders);
});

const getOrderByState = asyncHandler(async (req, res) => {
  const { state } = req.params;

  const orders = await Order.find({ state }).lean();

  if (orders.length === 0) {
    return res
      .status(404)
      .json({ message: "No orders found for the specified state" });
  }

  res.json(orders);
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId: userId }).lean();

  if (!orders) {
    return res.status(400).json({ message: "No orders found" });
  }

  res.json(orders);
});

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderByState,
  getOrderByUserId,
  getOrderDetails,
};
