const mongoose = require("mongoose");

const seedData = [
  {
    firstName: "Rachel",
    lastName: "Warbelow",
    email: "demo+rachel@jumpstartlab.com",
    password: "password",
    verified: "true",
  },
  {
    firstName: "Jeff",
    lastName: "Casimir",
    email: "demo+jeff@jumpstartlab.com",
    password: "password",
    displayName: "j3",
    verified: "true",
  },
  {
    firstName: "Jorge",
    lastName: "Tellez",
    email: "demo+jorge@jumpstartlab.com",
    password: "password",
    displayName: "novohispano",
    verified: "true",
  },
  {
    firstName: "Josh",
    lastName: "Cheek",
    email: "demo+josh@jumpstartlab.com",
    password: "password",
    displayName: "josh",
    role: "admin",
    verified: "true",
  },
];

module.exports = seedData;
