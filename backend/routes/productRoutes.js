const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.route('/').post(createProduct).get(getProducts);
router
  .route('/:id')
  .get(isAuthenticated, getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
