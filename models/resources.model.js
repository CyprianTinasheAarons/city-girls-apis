module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      category: String,
      title: String,
      url: String,
      resourceUrl: String,
    },
    { timestamps: true }
  );

  const Resource = mongoose.model("resource", schema);
  return Resource;
};
