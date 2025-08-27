import AuthService from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await AuthService.register(req.body);

    res
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .status(201)
      .json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await AuthService.login(req.body);

    res
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .status(200)
      .json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};
