const db = require("../models/index.js");
const Category = db.categories;

exports.addCategory = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const category = new Category({
    title: req.body.title,
  });

  category
    .save(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Category",
      });
    });
};

exports.findAll = (req, res) => {
  Category.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updateCategory = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "Category was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe Category was not found!`,
        });
      } else {
        res.send({
          message: "Category was  deleted successfully!",
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
  Category.deleteMany({})
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
