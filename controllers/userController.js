const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const User = require('../models/userModel')
const bcrypt = require("bcryptjs");


// GET All Users data  
exports.getAllUsers = BigPromise(async (req, res, next) => {
  const userList = await User.find();
  const data = userList
  res.status(200).json({
    success: true,
    data: {
      length: data.length,
      data
    }
  })
})



// GET a single User data
exports.getUser = BigPromise(async (req, res, next) => {
  const email = req.params.email;
  // Checking if we get ID or not
  if (!email) {
    next(new CustomError('Email is required', 400))
  }

  // Finding recipe from database
  const user = await User.findOne({ email });
  const data = [user];
  res.status(200).json({
    success: true,
    data: {
      length: data.length,
      data
    }
  })
})

// POST add user
exports.addUser = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking Email and Password are provided or not
  if (!email || !password) {
    next(new CustomError('Please Enter Email & Password', 400))
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
    // Sending Response
    res.status(201).json({
      success: true,
      message: 'User Created!'
    })
  }
  else {
    // Sending Response
    res.status(400).json({
      success: false,
      message: 'User Already Exists'
    })
  }
})

// POST Delete User
exports.deleteUser = BigPromise(async (req, res, next) => {

  // Checking if All data if provided
  const { email, password } = req.body;
  if (!email || !password) {
    next(new CustomError('Email & Password are required', 400))
  }

  // Find the user with help of Email provided and verify password with old one
  const user = await User.findOne({ email }).select("password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    await User.remove({ email })
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User Deleted!'
    })
  } else {
    next(new CustomError('Please enter valid password', 400))
  }
})
