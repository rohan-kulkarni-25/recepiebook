const express = require('express');
const { getHome } = require('../controllers/homeController');
const router = express.Router();

router.route('/').get(getHome)

module.exports = router;