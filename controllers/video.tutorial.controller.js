const db = require("../models/index.js");
const videoTutorial = db.videoTutorial;

exports.addVideoTutorial = (req, res) => {
 

  const _videoTutorial = new videoTutorial({
      title: req.body.title,
      url: req.body.url,
      desc: req.body.desc
  });

  _videoTutorial
    .save(_videoTutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the videoTutorial",
      });
    });
};

exports.findAll = (req, res) => {
  videoTutorial.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updatevideoTutorial = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  videoTutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "videoTutorial was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  videoTutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe videoTutorial was not found!`,
        });
      } else {
        res.send({
          message: "videoTutorial was  deleted successfully!",
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
  videoTutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} videoTutorial were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all videoTutorial ",
      });
    });
};
