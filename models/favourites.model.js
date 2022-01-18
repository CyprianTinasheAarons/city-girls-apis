const Service = require('./services.model')

module.exports = (mongoose) => {
    let schema = mongoose.Schema(
   
        {
            serviceName: String,
            description: String,
            logoUrl: String,
            category:String,
            location: String,
            websiteUrl: String,
            userId: String,
            email: String,
            phoneNumber: String,
            socialmedia: [],
            favourite: { 
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'user' 
            },
            available: Boolean,
            published: Boolean,
            
        },
  { timestamps: true }
);
  
    const Favourite = mongoose.model("Favourite", schema);
    return Favourite;
  };
   

