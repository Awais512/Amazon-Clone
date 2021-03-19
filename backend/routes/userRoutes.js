const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updatePassword,
  updateProfile,
  getAllProfiles,
  getProfile,
  updateProfileByAdmin,
  removeProfileByAdmin,
} = require('../controllers/userController');
const {
  isAuthenticated,
  authorizeRole,
} = require('../middlewares/authMiddleware');

router.get('/', isAuthenticated, authorizeRole('admin'), getAllProfiles);
router.get('/:id', isAuthenticated, authorizeRole('admin'), getProfile);
router.get('/myprofile/me', isAuthenticated, getUserProfile);
router.put('/password/update', isAuthenticated, updatePassword);
router.put('/me/update', isAuthenticated, updateProfile);
router.put(
  '/admin/user/:id',
  isAuthenticated,
  authorizeRole('admin'),
  updateProfileByAdmin
);

router.delete(
  '/admin/user/:id',
  isAuthenticated,
  authorizeRole('admin'),
  removeProfileByAdmin
);
module.exports = router;
