
const db = require("../models/index.js");
const process = require('process');
const Document = db.documents;

exports.addDocument = async(req, res) => {
   

  const document = new Document({
    title: req.body.title,
    name: req.body.name,
    url: 'https://afternoon-lowlands-61668.herokuapp.com/api/document/' +req.body.url,
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




exports.findAll = (req, res,next) => {
  res.header('Content-Range', 'docs 0-20/20')

  docs=[]
  Document.find()
    .then((data) => {
      data.forEach(function(post) {
        docs.push({id: post._id, title: post.title, url: post.url, desc: post.desc, createdAt: post.createdAt})
    });
      res.json(docs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};
 

exports.findDoc = (req, res,next) => {
  res.header('Content-Range', 'docs 0-20/20')

  Document.findOne({_id: req.params.id})
    .then((data) => {
      
    
      res.json({id: data._id,title:data.title,url: data.url,desc:data.desc,createdAt: data.createdAt});
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
        console.log(req.body)
        res.status(404).send({
         
          message: `Cannot update Plan with id=${id}`,
        });
      } else  res.status(200).json({id: data._id,title:data.title,url: data.url,desc:data.desc,createdAt: data.createdAt});;
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
