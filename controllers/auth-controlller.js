const User = require("../models/user_model");
const bcryptjs=require("bcryptjs");
// home
const home = async (req, res) => {
  try {
    res.status(200).send("welcome to homme page");
  } catch (error) {
    console.log(error);
  }
};

// register page

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email, phone } = req.body;
    // not need to write email:email is column name in db is same
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    // it is used tto encrypt the password using bcrypt js
    // salt round more means encryption is more
    // const saltRound=10;
    // const hashPass=await bcryptjs.hash(password,saltRound);

    // creating a document
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    // passing token and message
    res
      .status(201)
      .json({
        // message: userCreated,
        msg:"registration success",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    // it is good to convert _id to string
    // res.send("welcome to register page!");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req,res)=>{
  try {
    const{email,password}=req.body;
    const userExist=await User.findOne({email});

    if(!userExist){
      return res.status(400).json({msg:"invalid credentials!!"})
    }
    console.log("part1");
    // const user=await bcryptjs.compare(password,userExist.password);
    const user=await userExist.comparePass(password);

     console.log("we are ehre")
    if(user){
      console.log("login success!!");
      res.status(200).json({
        msg:"success login",
        token : await userExist.generateToken(),
        userId:userExist._id.toString()
      })
    }
    else{
      res.status(401).json({
        msg:user
      })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { home, register,login};
