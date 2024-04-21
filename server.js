require("dotenv").config();
const express=require('express');

const app=express();

const authRoute=require("./routes/auth_router");
const contactRoute=require("./routes/contact-router");
const dbConnect=require("./utils/db");

const error_middleware=require("./middleware/error_middleware");

// this line ensures that now u can also deal(or use json data) with json data
// it must be applied at the beggining of ur middlware stack to ensure its availability for all handlers
app.use(express.json());

// Mount the router : To use the router in your express app u can mount it at a specific URL prefix
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);

// we are calling error middleware so that our expess express.application get to know that 
// we are using error middlware
app.use(error_middleware);

// app.get("/",(req,res)=>{
//     res.status(200).send("welcome to our page!!");
// });

// app.get("/home",(req,res)=>{
//     res.status(200).send("runnning at home page!!");
// })
dbConnect().then(()=>{

    const PORT=3000;
    app.listen(PORT,()=>{
        console.log(`server running at ${PORT}`)
    })
});