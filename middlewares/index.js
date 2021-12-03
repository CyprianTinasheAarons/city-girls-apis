const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyPlan = require("./verifyPlan");
const verifyChat = require("./verifyChat");
const verifyAffiliate = require("./verifyAffiliate");

module.exports = {
  authJwt,
  verifySignUp,
  verifyPlan,
  verifyChat,
  verifyAffiliate,
};
