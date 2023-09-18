const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginService = async (email, password) => {
  try {
    const exist = await User.findOne({ email: email });
    if (!exist) {
      return res.status(400).json({ msg: "user not found" });
    }

    const matchPassword = await bcrypt.compare(password, exist.password);

    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: exist.email, id: exist._id },
      process.env.SECRET_KEY
    );
    return { user: exist, token: token };
  } catch (err) {
    throw err;
  }
};

const registerService = async (
  email,
  password,
  firstName,
  lastName,
  displayName
) => {
  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: req.body.displayName,
    });

    const user = await newUser.save();
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = { loginService, registerService };
