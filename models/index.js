const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.plans = require("./plans.model.js")(mongoose);
db.categories = require("./categories.model.js")(mongoose);
db.emails = require("./emails.model.js")(mongoose);
db.affiliates = require("./affiliate.model.js")(mongoose);
db.payments = require("./payments.model.js")(mongoose);
db.chats = require("./chats.model.js")(mongoose);

module.exports = db;
