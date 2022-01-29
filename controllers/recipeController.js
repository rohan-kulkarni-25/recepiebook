const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const Recipe = require('../models/recipeModel')
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");


// GET All recipe data  
exports.getAllRecipe = BigPromise(async (req, res, next) => {
  const recipeList = await Recipe.find();
  const data = recipeList
  res.status(200).json({
    success: true,
    data: {
      length: data.length,
      data
    }
  })
})



// GET a single recipe data
exports.getRecipe = BigPromise(async (req, res, next) => {
  const _id = req.params.id;

  // Checking if we get ID or not
  if (!_id) {
    next(new CustomError('Id is required', 400))
  }

  // Finding recipe from database
  const recipe = await Recipe.findOne({ _id });
  const data = [recipe];
  res.status(200).json({
    success: true,
    data: {
      length: data.length,
      data
    }
  })
})

// POST add Recipe
exports.addRecipe = BigPromise(async (req, res, next) => {
  const { name, email, password, description, ingredients, electronic_instruments, preperation_time, precautions, nutrition_value } = req.body;

  // Checking Email and Password are provided or not
  if (!email || !password) {
    next(new CustomError('Please Enter Email & Password', 400))
  }

  // Checking If recipe Name is provided
  if (!name) {
    next(new CustomError('Please Enter Name', 400))
  }

  // Check if user already exists 
  let user = await User.findOne({ email });

  // If User is not available then create new user
  if (!user) {
    // Create User with help of EMAIL & PASSWORD
    const userObject = {
      email,
      password
    }
    user = await User.create(userObject)

  }
  console.log(user);
  // Creating New Recipe
  const data = {
    name,
    description,
    ingredients,
    electronic_instruments,
    preperation_time,
    precautions,
    nutrition_value,
    user: user._id,
    userEmail: user.email
  }

  const recipe = await Recipe.create(data)


  // Sending Response
  res.send({
    success: true,
    message: 'Recipe Added!',
    recipe
  })
})

// POST Delete Recipe
exports.deleteRecipe = BigPromise(async (req, res, next) => {

  // Checking if All data if provided
  const { _id, email, password } = req.body;
  if (!email || !password || !_id) {
    next(new CustomError('Id, Email & Password are required', 400))
  }

  // Find the user with help of Email provided and verify password with old one
  const user = await User.findOne({ email }).select("password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const recipe = await Recipe.findById({
      _id
    })
    await Recipe.remove({ _id })

    // Sending Response
    res.status(200).json({
      success: true,
      message: 'Recipe Deleted!'
    })
  } else {
    next(new CustomError('Please enter valid password', 400))
  }
})
