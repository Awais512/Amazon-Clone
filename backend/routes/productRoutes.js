const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReview,
  deleteProductReview,
} = require('../controllers/productController');
const router = express.Router();
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router
  .route('/')
  .post(isAuthenticated, authorizeRole('admin'), createProduct)
  .get(getProducts);
router
  .route('/:id')
  .get(getProduct)
  .put(isAuthenticated, authorizeRole('admin'), updateProduct)
  .delete(isAuthenticated, authorizeRole('admin'), deleteProduct);

router.route('/review/myreview').put(isAuthenticated, createProductReview);
router.route('/review/allreviews').get(isAuthenticated, getProductReview);
router
  .route('/review/deletereview')
  .delete(isAuthenticated, deleteProductReview);

module.exports = router;
