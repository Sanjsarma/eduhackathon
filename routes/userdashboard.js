const express=require('express');
const expressLayouts=require('express-ejs-layouts');
var router = express.Router();
var db=require('../db/data');

router.get("/dashboard",require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
  res.render("student",{user:req.user});
});

module.exports = router; 