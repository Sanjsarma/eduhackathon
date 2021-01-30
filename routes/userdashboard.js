const e = require('express');
const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
var router = express.Router();
var db=require('../db/data');

router.get("/dashboard",require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
  var sql='SELECT * from user where ktuid=?';
  var ktuid=[req.session.ktuid];
  console.log(ktuid);
  db.query(sql,ktuid,(err,userdata)=>{
    var sqldata='SELECT * from courses';
    if(userdata[0].role=="admin"){
      db.query(sqldata,(err,data)=>{
        if(err) throw err;
        console.log(data);
        res.render("admin",{coursedata:data}); 
        });    }
    else{
    var sqldata='SELECT * FROM courses where sem='+userdata[0].sem+' and branchid='+userdata[0].branchid;
    db.query(sqldata,(err,data)=>{
    if(err) throw err;
    console.log(data);
    res.render("student",{Userdata:userdata,coursedata:data}); 
    });
   } });
});


module.exports = router; 