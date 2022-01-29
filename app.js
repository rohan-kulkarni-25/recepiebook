require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')

// Regular Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

// Morgan Middleware 
app.use(morgan('tiny'))


// import all routes here
const recipe = require('./routes/recipe')
const user = require('./routes/user')
const home = require('./routes/home')

// router middleware 

app.use('/api/v1', recipe)
app.use('/api/v1', user)
app.use('/', home)



module.exports = app;