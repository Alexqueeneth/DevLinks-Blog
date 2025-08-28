import Joi from "joi";

export const followSchema = Joi.object({
  userId: Joi.string().required(), // ID of the user being followed/unfollowed
});
