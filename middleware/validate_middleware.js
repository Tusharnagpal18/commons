const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // console.log(err);
    const status=422;
    const msg="fill the detail properly!!";
    const extraDetail= err.errors[0].code;
    const error={
      status,msg,extraDetail
    }
    console.log("MSG",msg);
    // res.status(401).json({ msg: msgs});
    next(error);
  }
};

module.exports=validate;
