module.exports = (app) => {
  const categories = require("../controllers/categories.controller.js");

  let router = require("express").Router();

  router.post("/", categories.addCategory);

  router.get("/", categories.findAll);

  router.delete("/:id", categories.delete);

  router.delete("/", categories.deleteAll);

  app.use("/api/categories", router);
};
