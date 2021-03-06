const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorHandler');
const APIFeature = require('../utils/apiFeatures');

//@desc     Create Products
//@route    POST /api/v1/products
//@access   Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//@desc     Get Products
//@route    GET /api/v1/products
//@access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeatures.query;

  res
    .status(200)
    .json({ success: true, count: products.length, productCount, products });
});

//@desc     Get Products
//@route    GET /api/v1/products/:id
//@access   Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({ success: true, product });
});

//@desc     Update Products
//@route    PUT /api/v1/products/:id
//@access   Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, product });
});

//@desc     Delete Products
//@route    DELETE /api/v1/products/:id
//@access   Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  await product.remove();
  res.status(200).json({ msg: 'Product deleted successfully', data: {} });
});

//@desc     Create Product Review
//@route    PUT /api/v1/review
//@access   Private
exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

//@desc     Get Product Review
//@route    GET /api/v1/product/review/allreviews
//@access   Public
exports.getProductReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  res.status(200).json({ success: true, reviews: product.reviews });
});

//@desc     Delete Product Review
//@route    DELETE /api/v1/product/review/deletereview
//@access   Public
exports.deleteProductReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      review,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true });
});
