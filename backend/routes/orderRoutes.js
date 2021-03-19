const express = require('express');
const router = express.Router();

const { newOrder } = require('../controllers/orderController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.route('/').post(isAuthenticated, newOrder);

module.exports = router;
