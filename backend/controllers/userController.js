const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

//@desc     Get LoogedIn User
//@route    POST /api/v1/users
//@access   Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler('User does not exist in our database', 404));
  }
  res.status(200).json({ success: true, user });
});
