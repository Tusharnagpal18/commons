const Contact=require("../models/contact-model");

const  contactForm = async(req,res)=>{
    try {
        const response=req.body;

        await Contact.create(response);
        return res.status(200).json({
            msg:"msg send successfull!!"
        });
    } catch (error) {
        return res.status(501).json({
            msg:"msg not delivered!!"
        })
    }
}

module.exports=contactForm;