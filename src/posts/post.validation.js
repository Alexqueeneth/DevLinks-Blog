import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  category: Joi.string().optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  category: Joi.string().optional(),
});
