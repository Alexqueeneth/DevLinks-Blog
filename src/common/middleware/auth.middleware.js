import jwt from "jsonwebtoken";
import { ConfigService } from "../config.service.js";
import { sendResponse } from "../utils.common.js";

export class AuthMiddleware {
  static verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return sendResponse(res, 401, false, "Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, ConfigService.getOrThrow("JWT_SECRET"));
      req.user = decoded; // contains { id, email, role }
      next();
    } catch (error) {
      return sendResponse(res, 403, false, "Invalid or expired token.");
    }
  }

  static isAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
      return sendResponse(res, 403, false, "Admin access required");
    }
    next();
  }
}
