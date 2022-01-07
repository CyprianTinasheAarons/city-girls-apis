module.exports = (app) => {
  const categories = require("../controllers/categories.controller.js");
  const { authJwt } = require("../middlewares");


  let router = require("express").Router();

  router.post("/",[authJwt.verifyToken],categories.addCategory);

  router.get("/",[authJwt.verifyToken], categories.findAll);
  router.get("/:category",[authJwt.verifyToken], categories.filter);

  router.delete("/:id",[authJwt.verifyToken], categories.delete);

  router.delete("/",[authJwt.verifyToken], categories.deleteAll);

  app.use("/api/categories", router);
};
