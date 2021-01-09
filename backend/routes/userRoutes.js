const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.get('/me', isAuthenticated, getUserProfile);
module.exports = router;
