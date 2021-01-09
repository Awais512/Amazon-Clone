const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updatePassword,
} = require('../controllers/userController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.get('/me', isAuthenticated, getUserProfile);
router.put('/password/update', isAuthenticated, updatePassword);
module.exports = router;
