const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "name is requird" })
    .trim()
    .min(3, { msg: "name must be at least 3 characters" })
    .max(255, { msg: "not more than 255" }),
  email: z
    .string({ required_error: "email is requird" })
    .trim()
    .min(3, { msg: "email must be at least 3 characters" })
    .max(255, { msg: "not more than 255" }),
  phone: z
    .string({ required_error: "name is requird" })
    .trim()
    .min(10, { msg: "name must be at least 10 characters" })
    .max(10, { msg: "not more than 10" }),
  password: z
    .string({ required_error: "name is requird" })
    .trim()
    .min(3, { msg: "name must be at least 3 characters" })
    .max(7, { msg: "not more than 255" }),
});

const loginSchema = z.object({
  username: z
    .string({ required_error: "name is requird" })
    .trim()
    .min(3, { msg: "username must be at least 3 characters" })
    .max(255, { msg: "not more than 255" }),
  password: z
    .string({ required_error: "password is requird" })
    .trim()
    .min(3, { msg: "password must be at least 3 characters" })
    .max(7, { msg: "not more than 255" }),
});
module.exports = {signupSchema,loginSchema};
