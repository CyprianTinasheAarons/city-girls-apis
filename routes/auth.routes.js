const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { check } = require("express-validator");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/auth/users", controller.users);


  app.put("/api/auth/users/update/:id", controller.update);

  app.put("/api/auth/users/update", controller.updateUsers);

  app.delete("/api/auth/users/delete/:id", controller.deleteOne);

  app.delete("/api/auth/users/delete", controller.deleteAll);

  //Password RESET
  app.post(
    "/api/auth/recover",
    [check("email").isEmail().withMessage("Enter a valid email address")],
    controller.recover
  );

  app.post(
    "/api/auth/user/recover",
    [check("email").isEmail().withMessage("Enter a valid email address")],
    controller.recoverUserPassword
  );

  app.post(
    "/api/auth/reset/:token",
    [
      check("password")
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage("Must be at least 8 chars long"),
      check("confirmPassword", "Passwords do not match").custom(
        (value, { req }) => value === req.body.password
      ),
    ],
    controller.resetPassword
  );
};
