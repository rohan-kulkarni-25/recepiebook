const express = require('express');
const { addRecepie ,getAllRecepie} = require('../Controllers/RecepieController');
const router = express.Router();
// const {isLoggedIn,customRole} = require('../middlewares/user');

router.route('/recepie').get(getAllRecepie)
router.route('/addrecepie').post(addRecepie)

module.exports = router;