const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const fs = require('fs');
const { marked } = require("marked");

// GET All Users data  
exports.getHome = BigPromise(async (req, res, next) => {
  var path = `${__dirname}/../public/Readme.md`;
  var file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
})


