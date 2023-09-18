const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const auth = require("../middleware/auth");

router.route("/:id").put(auth.auth, userController.updateUser);
router.get("/:id", auth.auth, userController.getUserById);
router.post("/:id", userController.updateUserAdmin);

module.exports = router;
