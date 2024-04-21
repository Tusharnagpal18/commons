const error_middleware=(err,req,res,next)=>{
    const status=err.status||500;
    const message=err.msg|| "backend error";
    const extraDetail=err.extraDetail||"some error occured";

    return res.status(status).json({message,extraDetail});
};

module.exports=error_middleware;