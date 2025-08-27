import Joi from "joi";
import { sendResponse } from "../utils.common.js";

export class ValidationMiddleware {
  static validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return sendResponse(res, 400, false, "Validation error", {
          details: error.details.map((d) => d.message),
        });
      }
      next();
    };
  }
}
