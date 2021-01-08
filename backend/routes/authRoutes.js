const express = require('express');
const {
  registeUsers,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registeUsers);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

module.exports = router;
