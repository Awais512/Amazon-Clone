const express = require('express');
const {
  registeUsers,
  login,
  logout,
  forgotPassword,
} = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registeUsers);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);

module.exports = router;
