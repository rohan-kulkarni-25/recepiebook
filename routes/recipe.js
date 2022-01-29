const express = require('express');
const { addRecipe, getRecipe, getAllRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.route('/recipes').get(getAllRecipe)
router.route('/recipe/:id').get(getRecipe)
router.route('/addRecipe').post(addRecipe)
router.route('/deleteRecipe').post(deleteRecipe)

module.exports = router;