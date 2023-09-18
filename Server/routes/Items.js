const express = require("express");
const router = express.Router();
const Items = require("../models/items");
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");

router.get("/", itemController.getAllItems);

router.get("/:itemId", itemController.getItemById);

router.get("/category/:categoryIds", itemController.getItem);
router.post(
  "/",
  auth.auth,
  auth.adminAuth,
  upload.single("photo"),
  async (req, res) => {
    const { title, description, price, category } = req.body;
    let photoUrl = null;

    if (!title) {
      return res.status(400).json({ message: "Title is missing" });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is missing" });
    }

    if (price === undefined || price === null || price < 0) {
      return res.status(400).json({ message: "Price is missing" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is missing" });
    }
    if (req.file) {
      const img = req.file.path;

      try {
        const result = await cloudinary.uploader.upload(img);
        photoUrl = result.secure_url;
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    const existingCategory = await Items.findOne({ title });

    if (existingCategory) {
      return res.status(400).json({ message: "Item already exists" });
    }

    try {
      const item = await Items.create({
        title,
        description,
        price,
        categories: category,
        photo: photoUrl,
      });

      if (item) {
        return res.status(201).json({ message: "New item created" });
      } else {
        return res.status(400).json({ message: "Failed to create item" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating item" });
    }
  }
);

router.delete("/:id", auth.auth, auth.adminAuth, itemController.deleteItem);
router.put("/:id", auth.auth, auth.adminAuth, itemController.updateItem);
router.put("/stock/:id", itemController.updateInStock);
router.put("/stocknot/:id", itemController.updateNegateInStock);

router.put(
  "/photo/:id",
  auth.auth,
  auth.adminAuth,
  upload.single("photo"),
  async (req, res) => {
    let photoUrl = null;

    const { id } = req.params;

    const item = await Items.findById(id).exec();

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    if (req.file) {
      const img = req.file.path;

      if (!id) {
        return res.status(400).json({ message: "ID required" });
      }

      try {
        const result = await cloudinary.uploader.upload(img);
        photoUrl = result.secure_url;
        item.photo = result.secure_url;
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    try {
      const updatedItem = await item.save();

      if (updatedItem) {
        return res.status(201).json({ message: "photo updated" });
      } else {
        return res.status(400).json({ message: "Failed " });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error " });
    }
  }
);

module.exports = router;
