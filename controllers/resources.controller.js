const db = require("../models/index.js");
const Resource = db.resource;

exports.addResource = (req, res) => {
 

  const resource = new resource({
    category: req.body.lastresource,
    title: req.body.count,
    url: req.body.url,
    resourceUrl: req.body.resourceUrl
  });

  resource
    .save(resource)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the resource",
      });
    });
};

exports.findAll = (req, res) => {
  Resource.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updateresource = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Resource.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "resource was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Resource.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe Resource was not found!`,
        });
      } else {
        res.send({
          message: "Resource was  deleted successfully!",
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
  Resource.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Resource were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all resource ",
      });
    });
};
