import Joi from "joi";

export const createNotificationSchema = Joi.object({
  recipient: Joi.string().required(),
  sender: Joi.string().required(),
  type: Joi.string().valid("comment", "reply", "reaction").required(),
  postId: Joi.string().optional(),
  commentId: Joi.string().optional(),
  message: Joi.string().required().max(255),
});

export const markReadSchema = Joi.object({
  id: Joi.string().required(),
});
