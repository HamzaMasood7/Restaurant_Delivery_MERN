const Items = require("../models/items");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

const getAllItems = asyncHandler(async (req, res) => {
  const items = await Items.find().lean();
  if (!items) {
    return res.status(400).json({ message: "No Items found" });
  }
  res.json(items);
});

const getItem = async (req, res) => {
  const { categoryIds } = req.params;

  if (!categoryIds) {
    try {
      const items = await Items.find().lean();

      if (!items || items.length === 0) {
        return res.status(404).json({ message: "No items found" });
      }

      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    const categoryIdArray = categoryIds.split(",");

    let query = {};

    if (categoryIdArray) {
      query = { categories: { $in: categoryIdArray } };
    }

    try {
      const items = await Items.find(query).lean();

      if (!items || items.length === 0) {
        return res.status(404).json({ message: "No items found" });
      }

      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
};
const getItemById = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!itemId) {
    return res.status(400).json({ message: "Item ID required" });
  }

  try {
    const item = await Items.findById(itemId).lean();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const createItem = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;
  const img = req.file.path;

  const existingCategory = await Items.findOne({ title });

  if (existingCategory) {
    return res.status(400).json({ message: "Item already exists" });
  }
  try {
    const result = await cloudinary.uploader.upload(img);

    const item = await Items.create({
      title,
      description,
      price,
      categories: category,
      photo: result.secure_url,
    });

    if (item) {
      return res.status(201).json({ message: "New item created" });
    } else {
      return res.status(400).json({ message: "Failed to create item" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error uploading image" });
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: " ID required" });
  }

  const item = await Items.findById(id).exec();

  if (!item) {
    return res.status(400).json({ message: " not found" });
  }

  const result = await item.deleteOne();

  const reply = ` ${result._id} deleted`;

  res.json(reply);
});

const checkAll = asyncHandler(async (req, res) => {
  console.log(req.userId);
  res.status(500).json({ message: " worrking" });
});

const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, price, category } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID required" });
  }

  const item = await Items.findById(id).exec();

  if (!item) {
    return res.status(400).json({ message: "Item not found" });
  }

  if (description) {
    item.description = description;
  }
  if (price) {
    item.price = price;
  }
  if (category) {
    item.categories = category;
  }

  const updatedItem = await item.save();

  res.json(updatedItem);
});

const updateInStock = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID required" });
    }

    const item = await Items.findById(id).exec();

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    item.inStock = true;

    const updatedItem = await item.save();

    return res.status(201).json({ message: "Updated" });
  } catch (err) {
    console.error(err);
  }
});

const updateNegateInStock = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID required" });
    }

    const item = await Items.findById(id).exec();

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    item.inStock = false;

    const updatedItem = await item.save();

    return res.status(201).json({ message: "Updated" });
  } catch (err) {
    console.error(err);
  }
});
module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  checkAll,
  updateItem,
  getItem,
  getItemById,
  updateInStock,
  updateNegateInStock,
};
