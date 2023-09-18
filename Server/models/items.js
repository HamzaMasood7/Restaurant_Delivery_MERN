const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  photo: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
