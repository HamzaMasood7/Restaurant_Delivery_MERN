const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  verifyEmail,
} = require("../controllers/authController");

router.post("/register", signupUser);
router.post("/login", loginUser);
router.get("/:id/verify/:token/", verifyEmail);

module.exports = router;
