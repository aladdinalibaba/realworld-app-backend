import Joi from 'joi';

const createSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(4).max(25).required(),
  password: Joi.string().min(8).max(80).required(),
});

export { createSchema };
