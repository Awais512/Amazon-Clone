const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updatePassword,
  updateProfile,
} = require('../controllers/userController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.get('/me', isAuthenticated, getUserProfile);
router.put('/password/update', isAuthenticated, updatePassword);
router.put('/me/update', isAuthenticated, updateProfile);
module.exports = router;
