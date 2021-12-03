const db = require("../models/index.js");
const Location = db.location;

exports.addLocation = (req, res,) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const location = new Location({
    name: req.body.name,
    city: req.body.city,
    country: req.body.country

  });

  location
    .save(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the location",
      });
    });
};








exports.findAll = (req, res) => {
  Location.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updatelocation = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Location.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "location was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Location.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe location was not found!`,
        });
      } else {
        res.send({
          message: "location was  deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Location.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Category were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all Category ",
      });
    });
};
