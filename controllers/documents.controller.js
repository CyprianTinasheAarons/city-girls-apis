
const db = require("../models/index.js");
const process = require('process');
const Document = db.documents;

exports.addDocument = async(req, res) => {
   

  const document = new Document({
    title: req.body.title,
    url: 'https://afternoon-lowlands-61668.herokuapp.com/document/' +req.body.url,
    desc: req.body.desc,
  });
  try {

  }catch(err) {
    res.send(400);
  }
  document
    .save(document)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Document",
      });
    });
};
exports.downloadFile = (req, res, next) => {
	const directoryPath = process.cwd() +'/uploads/'
	const filename = req.params.filename

	res.download(directoryPath + filename, filename, (error) => {
		if (error) {
			return res.send(error)
		}
	})}




exports.findAll = (req, res) => {
  Document.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};

exports.updateDocument = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Document.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.send({ message: "Document was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Document.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe Document was not found!`,
        });
      } else {
        res.send({
          message: "Document was  deleted successfully!",
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
  Document.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} period were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all period ",
      });
    });
};
