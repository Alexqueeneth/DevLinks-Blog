import Joi from "joi";

export const reactionSchema = Joi.object({
  type: Joi.string().valid("like", "dislike").required(),
  entityType: Joi.string().valid("Post", "Comment").required()
});
