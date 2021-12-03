const db = require("../models/index.js");
const Services = db.services;

exports.addServices = (req, res) => {
 

  const services = new Services({
    serviceName: req.body.serviceName,
    description: req.body.description,
    location: req.body.location,
    websiteUrl: req.body.websiteUrl,
    email: req.body.email,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    available: req.body.available,
    published: req.body.published,
    userId: req.body.userId,
    
  });

  services
    .save(services)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the services",
      });
    });
};

exports.findAll = (req, res) => {
  Services.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updateservices = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Services.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "services was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Services.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe services was not found!`,
        });
      } else {
        res.send({
          message: "services was  deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete category with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Services.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} services were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all services ",
      });
    });
};
