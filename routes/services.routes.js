module.exports = (app) => {
  const services = require("../controllers/services.controller.js");
  const {authJwt} = require('../middlewares')


  let router = require("express").Router();

  router.post("/",[authJwt.verifyToken], services.addServices);

  router.get("/", services.findAll);
  router.get("/:category", services.filter);
  router.get("/location/:location", services.filterLocation);
  router.post("/user/:id", services.findOne);


  router.delete("/:id", [authJwt.verifyToken],services.delete);

  router.delete("/",[authJwt.verifyToken], services.deleteAll);

  app.use("/api/services", router);
};
