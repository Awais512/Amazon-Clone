//
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');

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

  const token = user.getJwtToken();
  res.status(201).json({ success: true, token });
});
