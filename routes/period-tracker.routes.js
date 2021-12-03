module.exports = (app) => {
  const period = require("../controllers/period.controller.js");
  const {authJwt} = require('../middlewares')

  let router = require("express").Router();

  router.post("/", [authJwt.verifyToken],period.addPeriod);
  router.post("/update/:id", [authJwt.verifyToken],period.updatePeriod);

  router.get("/",[authJwt.verifyToken], period.findAll);

  router.delete("/:id",[authJwt.verifyToken], period.delete);

  router.delete("/",[authJwt.verifyToken], period.deleteAll);

  app.use("/api/period", router);

};
