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
  
    const videoTutorial = mongoose.model("videoTutorial", schema);
    return videoTutorial;
  };
  