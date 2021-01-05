const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

//@desc     Create Products
//@route    POST /api/v1/products
//@access   Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

//@desc     Get Products
//@route    GET /api/v1/products
//@access   Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res.status(200).json({ success: true, count: products.length, products });
});

//@desc     Get Products
//@route    GET /api/v1/products/:id
//@access   Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
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
