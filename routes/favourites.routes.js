module.exports = (app) => {
    const favourites = require("../controllers/favourites.controller.js");
    const {authJwt} = require('../middlewares')
  
  
    let router = require("express").Router();
  
    router.post("/",[authJwt.verifyToken], favourites.addFavourite);
  
    router.get("/",[authJwt.verifyToken], favourites.findAll);
    router.get("/:category", favourites.filter);
    router.get("/location/:location", favourites.filterLocation);
    router.get("/user/:id", favourites.findOne);
  
  
    router.delete("/:id", [authJwt.verifyToken],favourites.delete);
  
    router.delete("/",[authJwt.verifyToken], favourites.deleteAll);
  
    app.use("/api/favourites", router);
  };
  