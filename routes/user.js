const express = require('express');
const { getAllUsers, getUser, addUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.route('/users').get(getAllUsers)
router.route('/user/:email').get(getUser)
router.route('/user').post(addUser)
router.route('/user').delete(deleteUser)

module.exports = router;