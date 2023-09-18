const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllCategory = asyncHandler(async (req, res) => {
  const items = await Category.find().lean();
  if (!items) {
    return res.status(400).json({ msg: "No Category " });
  }
  res.json(items);
});

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ msg: "Title is empty" });
  }

  const existingCategory = await Category.findOne({ title });

  if (existingCategory) {
    return res.status(400).json({ msg: "Category already exists" });
  }

  const item = await Category.create({ title });

  if (item) {
    return res.status(201).json({ msg: "New item created" });
  } else {
    return res.status(400).json({ msg: "Not created" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "ID required" });
  }

  const item = await Category.findById(id).exec();

  if (!item) {
    return res.status(400).json({ msg: "Category not found" });
  }

  const result = await item.deleteOne();

  const reply = `${result._id} deleted`;

  res.json(reply);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!id || !title) {
    return res.status(400).json({ msg: "ID and title are required" });
  }

  const item = await Category.findById(id).exec();

  if (!item) {
    return res.status(400).json({ msg: "Category not found" });
  }

  const existingCategory = await Category.findOne({ title });

  if (existingCategory) {
    return res.status(400).json({ msg: "Category already exists" });
  }

  item.title = title;

  const updatedItem = await item.save();

  res.json(updatedItem);
});

module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
