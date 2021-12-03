module.exports = (app) => {
  const location = require("../controllers/location.controller.js");
  const { authJwt } = require("../middlewares");


  let router = require("express").Router();

  router.post("/",[authJwt.verifyToken],location.addLocation);

  router.get("/",[authJwt.verifyToken],location.findAll);


  router.delete("/:id",[authJwt.verifyToken], location.delete);

  router.delete("/", [authJwt.verifyToken],location.deleteAll);

  app.use("/api/location", router);
};
