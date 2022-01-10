module.exports = (app) => {
  const resource = require("../controllers/resources.controller.js");
  const {authJwt} = require('../middlewares')


  let router = require("express").Router();

  router.post("/", [authJwt.verifyToken],resource.addResource);

  router.get("/",[authJwt.verifyToken], resource.findAll);
  router.post("/:id",[authJwt.verifyToken], resource.updateresource);
  router.post("/:id",[authJwt.verifyToken], resource.findOne);
  router.delete("/:id",[authJwt.verifyToken], resource.delete);

  router.delete("/",[authJwt.verifyToken], resource.deleteAll);

  app.use("/api/resource", router);
};
