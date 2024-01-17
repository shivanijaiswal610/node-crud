const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3),
  email: Joi.string().email().min(10).required(),
  phone_no: Joi.string().length(10).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  address: Joi.string().max(100),
});

module.exports = { '/user/create': userSchema };
