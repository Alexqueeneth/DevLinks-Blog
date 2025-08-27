import UserService from './user.service.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
  try {
    // In many setups register is handled in Auth concern; kept here for completeness
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserService.createUser({ name, email, password: hashed, role });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { page, limit, q } = req.query;
    const data = await UserService.getUsers({ page: Number(page) || 1, limit: Number(limit) || 20, q });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const updated = await UserService.updateUserProfile(req.user.id, req.body);
    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const follow = async (req, res, next) => {
  try {
    const result = await UserService.followUser(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const unfollow = async (req, res, next) => {
  try {
    const result = await UserService.unfollowUser(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getFollowers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const data = await UserService.getFollowers(req.params.id, { page, limit });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getFollowing = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const data = await UserService.getFollowing(req.params.id, { page, limit });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const { postId } = req.body;
    const data = await UserService.toggleBookmark(req.user.id, postId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
