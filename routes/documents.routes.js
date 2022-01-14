
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({storage: storage});


module.exports = (app) => {
    const document = require("../controllers/documents.controller.js");
    const {authJwt} = require('../middlewares')
  
    let router = require("express").Router();
  
    router.post("/", [authJwt.verifyToken,upload.single('profile') ] ,document.addDocument);
    router.post("/update/:id",document.updateDocument);
  
    router.get("/", document.findAll);
    router.get("/:filename", document.downloadFile);
  
    router.delete("/:id",[authJwt.verifyToken], document.delete);
  
    router.delete("/",[authJwt.verifyToken], document.deleteAll);
  
    app.use("/api/document", router);
  
  };
  