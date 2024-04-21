const express = require("express");

const router = express.Router();

const { home, register } = require("../controllers/auth-controlller");
const authcontroller = require("../controllers/auth-controlller");
const {signupSchema,loginSchema} = require("../validator/auth-validator");
const validate = require("../middleware/validate_middleware");
// we can also use register seperately
// const {register}=require("../controllers/auth-controlller");
// router.get("/", (req, res) => {
//   res.status(200).send("welcome to home page using router");
// });

router.route("/").get(authcontroller.home);
// This is another method which is also very good
// router.route("/").get((res, req) => {
//   res.status(200).send("welcome to our website");
// });

router.route("/register").post(validate(signupSchema), authcontroller.register);
// router.route("/home").get((res,req)=>{
//     res.status(200).send("welcome to home page!!");
// });
// router.route("/login").post(authcontroller.login);
router.route("/login").post(validate(loginSchema),authcontroller.login);
module.exports = router;
