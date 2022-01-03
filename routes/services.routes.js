module.exports = (app) => {
  const services = require("../controllers/services.controller.js");
  const {authJwt} = require('../middlewares')


  let router = require("express").Router();

  router.post("/",[authJwt.verifyToken], services.addServices);

  router.get("/", services.findAll);


  router.delete("/:id", [authJwt.verifyToken],services.delete);

  router.delete("/",[authJwt.verifyToken], services.deleteAll);

  app.use("/api/services", router);
};
