const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

//@desc     Get LoggedIn User
//@route    POST /api/v1/users
//@access   Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler('User does not exist in our database', 404));
  }
  res.status(200).json({ success: true, user });
});

//@desc     Update User Password
//@route    PUT /api/v1/users/password/update
//@access   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});
