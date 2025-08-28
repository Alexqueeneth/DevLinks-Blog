import Joi from "joi";

export const addReactionSchema = Joi.object({
  type: Joi.string().valid("like", "dislike", "love", "laugh", "angry").required(),
  postId: Joi.string(),
  commentId: Joi.string(),
}).xor("postId", "commentId"); // must react to either a post or a comment

export const removeReactionSchema = Joi.object({
  postId: Joi.string(),
  commentId: Joi.string(),
}).xor("postId", "commentId");
