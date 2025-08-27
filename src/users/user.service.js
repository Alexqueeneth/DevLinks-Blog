import mongoose from 'mongoose';
import User from '../database/models/User.js';

class UserService {
  // Create user (used by auth.register typically)
  async createUser({ name, email, password, role = 'reader' }) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error('Email already in use');
    const user = await User.create({ name, email, password, role });
    const obj = user.toObject();
    delete obj.password;
    return obj;
  }

  // Read
  async getUserById(id) {
    if (!mongoose.isValidObjectId(id)) return null;
    return await User.findById(id)
      .select('-password')
      .populate('followers', 'name email avatar')
      .populate('following', 'name email avatar')
      .populate('bookmarks'); // bookmark population depends on Post schema
  }

  async getUsers({ page = 1, limit = 20, q = '' } = {}) {
    const skip = (Math.max(1, page) - 1) * limit;
    const filter = {};
    if (q) filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { bio: { $regex: q, $options: 'i' } }
    ];
    const users = await User.find(filter).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments(filter);
    return { users, meta: { page, limit, total } };
  }

  // Update
  async updateUserProfile(userId, updates = {}) {
    const allowed = ['name', 'bio', 'avatar'];
    const payload = Object.fromEntries(Object.entries(updates).filter(([k]) => allowed.includes(k)));
    const user = await User.findByIdAndUpdate(userId, payload, { new: true }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  // change password (expects hashed check to be done by caller or include bcrypt here)
  async changePassword(userId, newHashedPassword) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.password = newHashedPassword;
    await user.save();
    return true;
  }

  // Delete
  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return true;
  }

  // Follow / Unfollow
  async followUser(currentUserId, targetUserId) {
    if (currentUserId === targetUserId) throw new Error('Cannot follow yourself');
    if (!mongoose.isValidObjectId(targetUserId)) throw new Error('Invalid target id');

    const [current, target] = await Promise.all([
      User.findById(currentUserId),
      User.findById(targetUserId)
    ]);
    if (!current || !target) throw new Error('User not found');

    // prevent duplicates
    const alreadyFollowing = current.following.some(id => id.equals(target._id));
    if (alreadyFollowing) return { followed: false, message: 'Already following' };

    current.following.push(target._id);
    target.followers.push(current._id);

    await Promise.all([current.save(), target.save()]);

    return { followed: true };
  }

  async unfollowUser(currentUserId, targetUserId) {
    if (!mongoose.isValidObjectId(targetUserId)) throw new Error('Invalid target id');

    const [current, target] = await Promise.all([
      User.findById(currentUserId),
      User.findById(targetUserId)
    ]);
    if (!current || !target) throw new Error('User not found');

    current.following = current.following.filter(id => !id.equals(target._id));
    target.followers = target.followers.filter(id => !id.equals(current._id));

    await Promise.all([current.save(), target.save()]);

    return { unfollowed: true };
  }

  // Get follower / following lists (paginated)
  async getFollowers(userId, { page = 1, limit = 20 } = {}) {
    const user = await User.findById(userId).populate({
      path: 'followers',
      select: 'name email avatar',
      options: { skip: (page - 1) * limit, limit, sort: { createdAt: -1 } }
    });
    if (!user) throw new Error('User not found');
    const total = (user.followers && user.followers.length) || 0;
    return { followers: user.followers, meta: { page, limit, total } };
  }

  async getFollowing(userId, { page = 1, limit = 20 } = {}) {
    const user = await User.findById(userId).populate({
      path: 'following',
      select: 'name email avatar',
      options: { skip: (page - 1) * limit, limit, sort: { createdAt: -1 } }
    });
    if (!user) throw new Error('User not found');
    const total = (user.following && user.following.length) || 0;
    return { following: user.following, meta: { page, limit, total } };
  }

  // Bookmarks: toggle a post id in the bookmarks array
  async toggleBookmark(userId, postId) {
    if (!mongoose.isValidObjectId(postId)) throw new Error('Invalid post id');
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const exists = user.bookmarks.some(id => id.equals(postId));
    if (exists) {
      user.bookmarks = user.bookmarks.filter(id => !id.equals(postId));
      await user.save();
      return { bookmarked: false };
    } else {
      user.bookmarks.push(postId);
      await user.save();
      return { bookmarked: true };
    }
  }
}

export default new UserService();
