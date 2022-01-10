const { user } = require("../models/index.js");
const db = require("../models/index.js");
const Services = db.services;

exports.addServices = async (req, res) => {
  const author = await user.findOne({userId: req.body.userId});
 if(author) {
   author.service = true;
   author.save()
  
 }
 
  
  const services = new Services({
    serviceName: req.body.serviceName,
    description: req.body.description,
    location: req.body.location,
    owner: req.user,
    websiteUrl: req.body.websiteUrl,
    category: req.body.category,
    email: req.body.email,
    socialmedia: req.body.socialmedia,
    phoneNumber: req.body.phoneNumber,
    available: req.body.available,
    published: req.body.published,
    userId: req.body.userId,
    logoUrl: req.body.logoUrl
  });

  services
    .save(services)
    .then((data) => {
   

      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occured while creating the services",
      });
    });
};
exports.findOne = async (req, res) => {
  Services.findOne({userId: req.params.id})
    .then((data) => {

      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving your service.",
      });
    });
};

exports.findAll = (req, res) => {
  Services.find()
    .then((data) => {

      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};


exports.filter = (req, res) => {
  Services.find({category: req.params.category})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};
exports.filterLocation = (req, res) => {
  Services.find({location: req.params.location})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};




exports.updateservices = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Services.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Plan with id=${id}`,
        });
      } else res.json({ message: "services was updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Plan with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Services.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Job with id=${id}. Maybe services was not found!`,
        });
      } else {
        res.json({
          message: "services was  deleted successfully!",
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        message: "Could not delete category with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Services.deleteMany({})
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
