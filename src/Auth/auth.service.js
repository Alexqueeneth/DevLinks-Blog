import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

class AuthService {
  async register({ name, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }
}

export default new AuthService();
