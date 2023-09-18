const User = require("../models/user");
require("dotenv").config();
const Item = require("../models/items");
const Category = require("../models/category");
const Order = require("../models/order");
const userSeedData = require("./seedUser");
const itemSeedData = require("./seedItems");
const categorySeedData = require("./seedCategory");
const OrderSeedData = require("./seedOrder");
const mongoose = require("mongoose");

async function seedData() {
  try {
    await mongoose.connect("mongodb://localhost:27017");

    //await Order.insertMany(OrderSeedData);
    // await User.insertMany(userSeedData);
    //await Category.insertMany(categorySeedData);
    // await Item.insertMany(itemSeedData);

    // Insert users
    const users = await User.insertMany(userSeedData);
    const userIds = users.map((user) => user._id);

    // Insert categories
    const categories = await Category.insertMany(categorySeedData);
    const categoryIds = categories.map((category) => category._id);

    // Map the first category _id to items
    const itemsWithCategories = itemSeedData.map((item, index) => ({
      ...item,
      categories: [categoryIds[index % categoryIds.length]],
    }));

    // Insert items
    const items = await Item.insertMany(itemsWithCategories);
    const itemIds = items.map((item) => item._id);

    // Attach user IDs and item IDs to order seed data
    const ordersWithIds = OrderSeedData.map((order, index) => ({
      ...order,
      userId: userIds[index % userIds.length],
      items: order.items.map((item, i) => ({
        item: itemIds[(index * order.items.length + i) % itemIds.length],
        quantity: 2,
      })),
    }));

    await Order.insertMany(ordersWithIds);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error.message);
    process.exit(1);
  }
}

seedData();
