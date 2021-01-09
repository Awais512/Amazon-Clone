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

//@desc     Update User Profile
//@route    PUT /api/v1/users/me/update
//@access   Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //Update Avatar: TODO
  let user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  user.password = undefined;
  res.status(200).json({
    success: true,
    user,
  });
});

//@desc     Get all User Profiles
//@route    GET /api/v1/users
//@access   Private
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

//@desc     Get Profile
//@route    GET /api/v1/users/:id
//@access   Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User does not exist in our database', 404));
  }

  res.status(200).json({ success: true, user });
});

//@desc     Update User Profile by admin
//@route    PUT /api/v1/users/admin/update/:id
//@access   Private
exports.updateProfileByAdmin = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //Update Avatar: TODO
  let user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//@desc     Remove User Profile by admin
//@route    DELETE /api/v1/users/admin/delete/:id
//@access   Private
exports.removeProfileByAdmin = asyncHandler(async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
