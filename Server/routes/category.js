const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  getAllCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategory);
router.post("/", auth.auth, auth.adminAuth, createCategory);
router.delete("/:id", auth.auth, auth.adminAuth, deleteCategory);
router.patch("/:id", auth.auth, auth.adminAuth, updateCategory);

module.exports = router;
