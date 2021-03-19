const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');

//@desc     Create Order
//@route    POST /api/v1/orders
//@access   Private
exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({ success: true, order });
});

//@desc     Get Single Order
//@route    POST /api/v1/orders/:id
//@access   Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'User',
    'name email'
  );

  if (!order) {
    return next(new ErrorHandler('No order found with this id', 404));
  }

  res.status(200).json({ success: true, order });
});

//@desc     Get LoggedIn user Order
//@route    GET /api/v1/orders/me
//@access   Private
// exports.getLoggedInUserOrder = asyncHandler(async (req, res, next) => {
//     const orders = await Order.find({ user: req.user.id });

//     res.status(200).json({ success: true, orders });
// });

exports.getLoggedInUserOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err);
  }
};
