// const User = require("../models/user");
const BigPromise = require("../middlewares/BigPromise");
const CustomError = require("../Utils/customError");
const Recepie = require('../Models/RecepieModel')
// const cookieToken = require("../utils/cookieToken");
// const fileUploader = require("express-fileupload");
// const cloudinary = require("cloudinary");
// const { mailHelper } = require("../utils/emailhelper");
// const crypto = require("crypto");

// exports.signup = BigPromise(async (req, res, next) => {
//   let result;
//   if (req.files) {
//     let file = req.files.photo;
//     result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
//       folder: "users",
//       width: 150,
//       crop: "scale",
//     });
//   }

//   const { name, email, password } = req.body;
//   if (!email || !name || !password) {
//     return next(new CustomError("Name,email and password are required", 400));
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//     photo: {
//       id: result.public_id,
//       secure_url: result.secure_url,
//     },
//   });

//   cookieToken(user, res);
// });

// exports.login = BigPromise(async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if email and pass are provided
//   if (email && password) {
//     return next(new CustomError("please provide email and password"));
//   }
//   // Getting user from data
//   const user = User.findOne({ email }).select("password");

//   // Checking user not found in db
//   if (!user) {
//     return next(new CustomError("You are not registered", 400));
//   }

//   // Compare the password
//   const isPasswordCorrect = await user.isPasswordValid(password);
//   if (!isPasswordCorrect) {
//     return next(new CustomError("Email or password do not match", 400));
//   }

//   // If password match the send cookie
//   cookieToken(req, res);
// });

// exports.logout = BigPromise(async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   res.status(200).json({
//     succes: true,
//     message: "Logout",
//   });
// });

// exports.forgotPassword = BigPromise(async (req, res, next) => {
//   const { email } = req.body;

//   const user = User.find({ email });
//   if (!user) {
//     return next(new CustomError("User Do not exists Please register"));
//   }

//   const forgotToken = user.getForgotPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   const myUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/password/reset/${forgotToken}`;

//   const message = `Copy Paste this link in your URL and hit enter \n\n ${myUrl}`;

//   try {
//     const options = {
//       to: user.email,
//       sub: "Forgot Password Mail",
//       textMsg: message,
//     };
//     await mailHelper(options);
//     res.status(200).json({
//       succes: true,
//       message: "Email sent sucessfully",
//     });
//   } catch (error) {
//     user.forgotPassword = undefined;
//     user.forgotPasswordExpiry = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new CustomError(error.message, 500));
//   }
//   const options = {};
//   mailHelper(options);
// });

// exports.passwordReset = BigPromise(async (req, res, next) => {
//   const { token } = req.params.token;
//   const encryToken = crypto.createHash("sha256").update(token).digest("hex");

//   const user = await User.findOne({
//     encryToken,
//     forgotPasswordExpiry: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(new CustomError("Token is invalid or expired", 400));
//   }

//   if (req.body.password != req.body.confirmPassword) {
//     return next(
//       new CustomError("Password and Confirm Password Are not same", 400)
//     );
//   }

//   user.password = req.body.password;
//   user.forgotPassword = undefined;
//   user.forgotPasswordExpiry = undefined;
//   await user.save();

//   cookieToken(user, res);
// });

// exports.getLoggedInUserDetails = BigPromise(async (req,res,next) => {
//   const user = await User.findById(req.user.id)
  
//   res.status(200).json({
//     success:true,
//     user,
//   });
// })

// exports.changePassword = BigPromise(async (req,res,next) => {
//   const userId = req.user.id;
//   const user = await User.findById(userId).select("+password")
  
//   const IsCorrectOldPassword = await user.isPasswordValid(req.body.oldPassword)

//   if (!IsCorrectOldPassword) {
//     return next( new CustomError('Old Password do not match',400))
//   }

//   user.password = req.body.newPassword;
//   await user.save();

//   cookieToken(user,res)

// })

// exports.updateUserDetails = BigPromise(async(req,res,next)=>{

//   const {name ,email} = req.body
//   const newData = {
//     name,
//     email,
//   }

//   if (req.files) {
//     const user = await User.findById(req.user.id);
//     const imageId = req.user.id;

//     const response = await cloudinary.v2.uploader.destroy(imageId);
//     const result = await cloudinary.v2.uploader.upload(req.file.photo.tempFilePath,{
//       folder:"users",
//       width:150,
//       crop:"scale"
//     })

//     newData.photo = {
//       id:result.public_id,
//       secure_url:result.secure_url
//     }
//   }

//   const user = await User.findByIdAndUpdate(req.user.id,newData ,{
//     new:true,
//     runValidators:true,
//     useFindAndModify:false
//   });

//   res.status(200).json({
//     success:true,
//     user
//   })

// })

exports.getAllRecepie = BigPromise(async(req,res,next)=>{
  
  const recepie = await Recepie.find();

  res.status(200).json({
    success:true,
    recepie
  })

})

exports.addRecepie = BigPromise(async (req,res,next) => {
  const {name,description,ingredients,electronic_instruments,preperation_time,precautions,nutrition_value} = req.body;

  const data = {
    name,
    description,
    ingredients,
    electronic_instruments,
    preperation_time,
    precautions,
    nutrition_value
  }

  const recepie = await Recepie.create(data)

  res.send({
    recepie
  })
})