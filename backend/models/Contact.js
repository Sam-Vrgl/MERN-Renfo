// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index for efficient queries by user
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[0-9]{10,20}$/, 'Invalid phone number format.'],
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);