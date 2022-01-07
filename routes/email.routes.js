module.exports = (app) => {
    const email = require("../controllers/email.controller.js");

  
  
    let router = require("express").Router();
  
  
    router.post("/",email.sendInquiry);
  
 
    app.use("/api/email", router);
  };
  