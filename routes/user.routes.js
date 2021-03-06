const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/auth/all",[authJwt.verifyToken], controller.allAccess);
  app.delete("/api/auth/all",[authJwt.verifyToken], controller.deleteAll);
};
