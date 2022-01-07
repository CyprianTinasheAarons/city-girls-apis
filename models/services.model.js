module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      serviceName: String,
      description: String,
      logoUrl: String,
      category:String,
      location: String,
      websiteUrl: String,
      email: String,
      phoneNumber: String,
      socialmedia: [],

      owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
      },
      available: Boolean,
      published: Boolean,
      userId: String,
    },
    { timestamps: true }
  );

  const Service = mongoose.model("service", schema);
  return Service;
};
