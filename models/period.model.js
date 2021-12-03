module.exports = (mongoose) => {
    let schema = mongoose.Schema(
      {
        lastPeriod: Date,
        count: String,
        cycleCount: Number,
      },
      { timestamps: true }
    );
  
    const Period = mongoose.model("period", schema);
    return Period;
  };
  