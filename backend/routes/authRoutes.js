const express = require('express');
const { registeUsers, login } = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(registeUsers);
router.route('/login').post(login);

module.exports = router;
