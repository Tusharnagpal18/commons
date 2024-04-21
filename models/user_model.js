const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure the password
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("pre method", user);

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = 10;
    const hashPass = await bcryptjs.hash(user.password, saltRound);
    user.password = hashPass;
  } catch (error) {
    next(error);
  }
});

// using this methods we can create any no of  functions
// get more inffo about this
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.compare = async function (password) {
  // this keyword is very important here
  return await bcryptjs.compare(password, this.password);
};
// this line is used to add data in user and create collection in database
const User = new mongoose.model("User", userSchema);

module.exports = User;
