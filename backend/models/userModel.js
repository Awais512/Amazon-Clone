const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

//Encrypting Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Return jsonwebtoken
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

//Complete Password
userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
