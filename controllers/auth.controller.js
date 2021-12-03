const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const nodemailer = require("nodemailer");

const crypto = require("crypto");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "s1.pnrhost.com",
  secureConnection: true,
  port: 465,
  auth: {
    user: "sales@afroshelter.com",
    pass: "projectdawn*#",
  },
});

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    fullname: req.body.fullname,
    surname: req.body.surname,
    architectID: req.body.architectID,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user
    .save(user)
    .then((data) => {
      let link = "https://admin.afroshelter.com/auth/forgot-password";
      if (data.role == "architect") {
        const mailOptions = {
          from: '"Sales" <sales@afroshelter.com>', // sender address
          to: data.email, // list of receivers
          subject: "Architect Account Details", // Subject line
          text: `Hi ${user.fullname} \n 
          Your Afroshelter admin account has been successful created. Your Architect ID is ${data.architectID} and username is ${user.username}.  \n
          Please click on the following link ${link} to reset your password. \n\n 
            \n`, // plain text body
          html: `<b> Hi ${user.username} <br>
            Your Afroshelter admin account has been successful activated. Architect ID is ${data.architectID}.  <br>
            Please click on the following link ${link} to reset your password. <br><br>
            </b>`, // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.status(404).json(error);
          } else {
            return res.status(200).json("Email sent: " + info.response);
          }
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the User",
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, //  24hrs
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      surname: user.surname,
      email: user.email,
      phoneNumber: req.body.phoneNumber,
      role: user.role,
      image: user.image,
      architectID: user.architectID,
      accessToken: token,
    });
  });
};

exports.users = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.user = (req, res) => {
  console.log(req.params.architectId);

  const id = req.params.architectId;

  User.find({ architectID: `${id}` })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User  with id=${id}. Maybe User  was not found!`,
        });
      } else {
        res.send({
          message: "User  was  deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id= " + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} users were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all tutorials ",
      });
    });
};

exports.updateUsers = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  User.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else {
        data.forEach((user) => {
          user.role = [`${user.role}`];
          user.save();
        });
        res.send({ message: "Users were updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

// Architect Password Reset Email

// ===PASSWORD RECOVER AND RESET

exports.recover = (req, res) => {
  let email = { email: req.body.email };
  let update = {
    resetPasswordToken: crypto.randomBytes(20).toString("hex"),
    resetPasswordExpires: Date.now() + 3600000,
  };
  User.findOneAndUpdate(email, update, { returnOriginal: false })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });
      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email

          let link =
            "https://admin.afroshelter.com/auth/reset-password/" +
            user.resetPasswordToken;

          const mailOptions = {
            from: '"Sales" <sales@afroshelter.com>', // sender address
            to: user.email, // list of receivers
            subject: "Password change request", // Subject line
            text: `Hi ${user.username} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
            html: `<b> Hi ${user.username} <br>
            Please click on the following link ${link} to reset your password. <br><br>
            If you did not request this, please ignore this email and your password will remain unchanged.</b>`, // html body
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return res.status(404).json(error);
            } else {
              return res.status(200).json("Email sent: " + info.response);
            }
          });
        })
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(500).json({ message: err }));
};

exports.recoverUserPassword = (req, res) => {
  let email = { email: req.body.email };
  let update = {
    resetPasswordToken: crypto.randomBytes(20).toString("hex"),
    resetPasswordExpires: Date.now() + 3600000,
  };
  User.findOneAndUpdate(email, update, { returnOriginal: false })
    .then((user) => {
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });
      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email

          let link =
            "https://afroshelter.com/auth/reset-password/" +
            user.resetPasswordToken;

          const mailOptions = {
            from: '"Sales" <sales@afroshelter.com>', // sender address
            to: user.email, // list of receivers
            subject: "Password change request", // Subject line
            text: `Hi ${user.username} \n 
            Please click on the following link ${link} to reset your password. \n\n 
            If you did not request this, please ignore this email and your password will remain unchanged.\n`, // plain text body
            html: `<b> Hi ${user.username} <br>
            Please click on the following link ${link} to reset your password. <br><br>
            If you did not request this, please ignore this email and your password will remain unchanged.</b>`, // html body
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return res.status(404).json(error);
            } else {
              return res.status(200).json("Email sent: " + info.response);
            }
          });
        })
        .catch((err) => res.status(500).json({ message: err }));
    })
    .catch((err) => res.status(500).json({ message: err }));
};

exports.resetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then((user) => {
    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = bcrypt.hashSync(req.body.password, 8);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save((err) => {
      if (err) return res.status(500).json({ message: err.message });

      const mailOptions = {
        from: '"Sales" <sales@afroshelter.com>', // sender address
        to: user.email, // list of receivers
        subject: "Your password has been changed", // Subject line
        text: `Hi ${user.username} \n 
        This is a confirmation that the password for your account ${user.email} has just been changed.\n`, // plain text body
        html: ` <b>Hi ${user.username}<br>
        This is a confirmation that the password for your account ${user.email} has just been changed.</b>`, // html body
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(404).json(error);
        } else {
          return res.status(200).json("Email sent: " + info.response);
        }
      });
    });
  });
};
