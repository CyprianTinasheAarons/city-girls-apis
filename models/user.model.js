module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      email: String,
      fullname: String,
      surname: String,
      password: String,
      service: Boolean,
      role:[],
      resetPasswordToken: String,
      resetPasswordExpires: Date,
    },
    { timestamps: true }
  );

  const User = mongoose.model("user", schema);
  return User;
};
