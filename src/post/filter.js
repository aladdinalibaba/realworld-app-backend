import Joi from 'joi';

const addTagsSchema = Joi.object({
  tags: Joi.array().items(Joi.string().required()).min(1).required(),
});

const createSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string().required()).min(1).optional(),
});

export { addTagsSchema, createSchema };
