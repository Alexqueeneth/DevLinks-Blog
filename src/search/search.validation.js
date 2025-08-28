import Joi from "joi";

export const searchPostsSchema = Joi.object({
  query: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  author: Joi.string(),
  sort: Joi.string().valid("newest", "oldest"),
  fromDate: Joi.date().iso(),
  toDate: Joi.date().iso(),
});

export const searchUsersSchema = Joi.object({
  query: Joi.string().required(),
});

export const searchCommentsSchema = Joi.object({
  query: Joi.string().required(),
  postId: Joi.string().optional(),
});

