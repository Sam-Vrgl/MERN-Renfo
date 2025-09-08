// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [10, 'Password must be at least 10 characters long'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false, // Hides this field from default query results
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    select: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
