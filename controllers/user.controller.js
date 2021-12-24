const db = require("../models/index.js");
const User = db.role;

exports.allAccess = (req, res) => {
  res.status(200).json("Public  Content.");
};
