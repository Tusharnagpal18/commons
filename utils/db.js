const mongoose=require('mongoose');

const URL=process.env.DBURL;

const dbConnect = async ()=>{
    try {
        await mongoose.connect(URL);
        console.log("connection successfull!!");
    } catch (error) {
        console.log("Db connection failed");
        console.log(error);
        process.exit(0);
    }
};

module.exports=dbConnect;