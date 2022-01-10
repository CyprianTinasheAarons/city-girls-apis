const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.categories = require("./categories.model.js")(mongoose);
db.location = require("./location.model.js")(mongoose);
db.period = require("./period.model.js")(mongoose);
db.resource = require("./resources.model.js")(mongoose);
db.services = require("./services.model.js")(mongoose);
db.videoTutorial = require("./video.tutorials.model.js")(mongoose);





module.exports = db;
