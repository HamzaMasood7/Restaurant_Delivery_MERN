const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = user.id;
    } else {
      res.status(401).json({ msg: "unauthenthorized auth user" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ ERR: "unauthenthorized auth user" });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const exist = await User.findById(req.userId);
    const isAdmin = exist.role;
    if (isAdmin == "admin") {
    } else {
      res.status(401).json({ msg: "unauthenthorized auth user" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ ERR: "unauthenthorized auth user" });
  }
};

module.exports = { auth, adminAuth };
