const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

//@desc     Register Users
//@route    POST /api/v1/users
//@access   Public
exports.registeUsers = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatar/awais_k3i2en',
      url:
        'https://res.cloudinary.com/awais512/image/upload/v1609864174/avatar/awais_k3i2en.jpg',
    },
  });

  sendToken(user, 200, res);

  // const token = user.getJwtToken();
  // res.status(201).json({ success: true, token });
});

//@desc     Login Users
//@route    POST /api/v1/users/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  //Check if password is correct
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler('Invalid email and password', 401));
  }
  sendToken(user, 200, res);
});
