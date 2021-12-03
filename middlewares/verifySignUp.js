const db = require("../models");
// const ROLES = db.ROLES
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  //Username
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
   

    //Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is  already in use!" });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
