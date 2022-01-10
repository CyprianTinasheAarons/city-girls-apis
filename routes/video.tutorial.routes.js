module.exports = (app) => {
    const videoTutorial = require("../controllers/video.tutorial.controller.js");
    const {authJwt} = require('../middlewares')
  
  
    let router = require("express").Router();
  
    router.post("/",[authJwt.verifyToken], videoTutorial.addVideoTutorial);
  
    router.get("/", videoTutorial.findAll);
  
  
  
    router.delete("/:id", [authJwt.verifyToken],videoTutorial.delete);
  
    router.delete("/",[authJwt.verifyToken], videoTutorial.deleteAll);
  
    app.use("/api/videotutorial", router);
  };
  