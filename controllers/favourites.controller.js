const db = require("../models/index.js");
const Favourite = db.favourites;

const { user } = require("../models/index.js");

exports.addFavourite = async (req, res) => {
  const favitem = await Favourite.findOne({serviceName: req.body.serviceName,userId:req.userId});
  if(favitem){
    return res.send(ok)
  }
  else {

    const favourite = new Favourite({
        serviceName: req.body.serviceName,
        description: req.body.description,
        location: req.body.location,
        websiteUrl: req.body.websiteUrl,
        category: req.body.category,
        email: req.body.email,
        socialmedia: req.body.socialmedia,
        phoneNumber: req.body.phoneNumber,
        available: req.body.available,
        published: req.body.published,
        favourite: req.userId,
        userId: req.body.userId,
        logoUrl: req.body.logoUrl
      });
    
      favourite
        .save(favourite)
        .then((data) => {
       
    
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json({
            message:
              err.message || "Some error occured while creating the Favourite",
          });
        })
  
      }
  
 
};
exports.findOne = async (req, res) => {
  Favourite.findOne({userId: req.params.id})
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
  favs=[]
  Favourite.find({favourite: req.userId})
  
    .then((data) => {
      data.forEach(function(item) {
        favs.push({_id: item._id, serviceName: item.serviceName, logoUrl: item.logoUrl, 
          description: item.description, createdAt: item.createdAt,location:item.location,
          websiteUrl: item.websiteUrl,category: item.category,email:item.email,phoneNumber:item.phoneNumber,available:item.available,published:item.published,userId:item.userId,updatedAt:item.updatedAt,__v:item.__v})
    });
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};


exports.filter = (req, res) => {
  Favourite.find({category: req.params.category})
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
  Favourite.find({location: req.params.location})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error  occured while retrieving Jobs.",
      });
    });
};





exports.delete = (req, res) => {
  const id = req.params.id;
  Favourite.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete Job with id=${id}. Maybe Favourite was not found!`,
        });
      } else {
        res.json({
          message: "Favourite was  deleted successfully!",
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
  Favourite.deleteMany({})
    .then((data) => {
      res.json({
        message: `${data.deletedCount} Favourite were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occured while removing all Favourite ",
      });
    });
};


