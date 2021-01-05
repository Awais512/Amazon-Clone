const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: [true, 'Please enter your name'],
      maxLength: [30, "Name can't exceed 30 characters"],
    },

    email: {
      type: 'string',
      required: [true, 'Please enter your email'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address'],
    },

    password: {
      type: 'string',
      required: [true, 'Please enter your password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: 'string',
        required: true,
      },
      url: {
        type: 'string',
        required: true,
      },
    },
    role: {
      type: 'string',
      default: 'user',
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
