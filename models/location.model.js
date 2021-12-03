module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      name: String,
      city: String,
      country: String,
    },
    { timestamps: true }
  );

  const Location = mongoose.model("location", schema);
  return Location;
};
