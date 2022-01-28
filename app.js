require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan')

// Regular Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// cookies and file middleware 
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/temp/'
}));

// 

// Morgan Middleware 
app.use(morgan('tiny'))

// import all routes here 
const recepie = require('./Routes/Recepie')
// const user = require('./routes/user')
// const product = require('./routes/product')


// router middleware 
app.use('/api/v1',recepie)
// app.use('/api/v1',user)
// app.use('/api/v1',product)


module.exports = app;