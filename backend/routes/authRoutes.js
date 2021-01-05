const express = require('express');
const { registeUsers } = require('../controllers/authController');
const router = express.Router();

router.route('/').post(registeUsers);

module.exports = router;
