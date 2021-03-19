const express = require('express');
const router = express.Router();

const {
  newOrder,
  getOrder,
  getLoggedInUserOrder,
  getOrders,
  updateOrder,
  deleteOrders,
} = require('../controllers/orderController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router
  .route('/')
  .post(isAuthenticated, newOrder)
  .get(isAuthenticated, authorizeRole('admin'), getOrders);
router.route('/:id').get(isAuthenticated, getOrder);
router.route('/myorder/me').get(isAuthenticated, getLoggedInUserOrder);
router
  .route('/admin/:id')
  .put(isAuthenticated, authorizeRole('admin'), updateOrder)
  .delete(isAuthenticated, authorizeRole('admin'), deleteOrders);

module.exports = router;
