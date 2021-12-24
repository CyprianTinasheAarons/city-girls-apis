module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      serviceName: String,
      description: String,
      logoUrl: String,
      location: String,
      websiteUrl: String,
      email: String,
      phoneNumber: String,
      socialmedia: [],
      available: Boolean,
      published: Boolean,
      userId: String,
    },
    { timestamps: true }
  );

  const Service = mongoose.model("service", schema);
  return Service;
};
