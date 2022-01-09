const db = require("../models/index.js");
const { user } = require("../models/index.js");
const User = db.role;

exports.allAccess = async (req, res,next) => {
  user.findOne()
    .then((data) => {

      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.deleteAll = (req, res) => {
  user.deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} services were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occured while removing all services ",
      });
    });
};
