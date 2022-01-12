module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        title: String,
        url: String,
        img: String,
        desc:String,
      },
      { timestamps: true }
    );
  
    const Documents = mongoose.model("documents", schema);
    return Documents;
  };
  