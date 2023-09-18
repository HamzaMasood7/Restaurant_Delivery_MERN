const userService = require("../services/authService");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email: email });
    if (!exist) {
      return res.status(400).json({ msg: "user not found" });
    }

    const matchPassword = password === exist.password;

    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    if (!exist.verified) {
      let token = await Token.findOne({ userId: exist._id });

      if (!token) {
        token = await new Token({
          userId: exist._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${exist.id}/verify/${token.token}`;
        await sendEmail(exist.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ msg: "An Email sent to your account please verify" });
    }

    const token1 = jwt.sign(
      { email: exist.email, id: exist._id },
      process.env.SECRET_KEY
    );

    res.status(201).json({ user: exist, token: token1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

const signupUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, displayName } = req.body;
    console.log("req.body", req.body);
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: req.body.email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
    });

    const user = await newUser.save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}api/auth/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).json({ msg: "Verification Email Sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ msg: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ msg: "Invalid link" });

    await User.updateOne({ _id: user._id }, { verified: true });

    res.status(200).send({ msg: "Email verified successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = { loginUser, signupUser, verifyEmail };
