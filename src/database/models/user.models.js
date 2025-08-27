import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, // don't return by default
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },

  role: { type: String, enum: ['admin', 'author', 'reader'], default: 'reader' },

  // social relations as arrays of ObjectId referencing users
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // people who follow this user
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }], // people this user follows

  // bookmarks: store post ids (ref to Post, which we'll implement in Post concern)
  bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],

  // account status
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// helpful indexes
UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);
