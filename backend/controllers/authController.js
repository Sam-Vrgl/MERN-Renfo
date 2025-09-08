// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await User.create({ email, password });
    res.status(201).json({ message: 'User registered successfully.' });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate user and get token
// @route   POST /api/v1/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, isDeleted: false });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        token: generateToken(user._id),
        userId: user._id,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
