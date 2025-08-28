import Joi from "joi";

export const uploadMediaSchema = Joi.object({
  onModel: Joi.string().valid("Post", "Comment", "User").required(),
  relatedTo: Joi.string().required(),
});
