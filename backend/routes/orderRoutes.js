const express = require('express');
const router = express.Router();

const {
  newOrder,
  getOrder,
  getLoggedInUserOrder,
} = require('../controllers/orderController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.route('/').post(isAuthenticated, newOrder);
router.route('/:id').get(isAuthenticated, getOrder);
router.route('/myorder/me').get(isAuthenticated, getLoggedInUserOrder);

module.exports = router;
