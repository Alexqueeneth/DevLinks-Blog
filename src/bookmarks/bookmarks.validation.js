import Joi from "joi";

export const bookmarkSchema = Joi.object({
  postId: Joi.string().required(), // ID of post to bookmark/unbookmark
});
