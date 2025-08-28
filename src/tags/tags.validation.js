import Joi from "joi";

export const createTagSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
});

export const updateTagSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
});
