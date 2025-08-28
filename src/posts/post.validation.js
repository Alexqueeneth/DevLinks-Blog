import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().required(),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid("draft", "published", "scheduled").default("draft"),
  publishedAt: Joi.date().optional(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  content: Joi.string(),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid("draft", "published", "scheduled"),
  publishedAt: Joi.date().optional(),
});
