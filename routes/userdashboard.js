const e = require('express');
const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const session=require('express-session');
var router = express.Router();
var db=require('../db/data');
router.get("/materials", function(req, res){
  var sql='SELECT * FROM materials';
  db.query(sql, function (err, data, fields) {
    res.render("materials.ejs",{ userData : data });
  });


    

  

    
      
});



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

router.post('/changename', function(req, res, next) {
    
  inputData ={
      name: req.body.name
      
  }
var sql='Update user set name = (?)  WHERE ktuid = (?)';
db.query(sql, [inputData.name,req.session.ktuid] ,function (err, data1, fields) {
if(err) throw err
res.redirect('/dashboard');
   
});
});


router.post('/changesem', function(req, res, next) {
    
  inputData ={
      name: parseInt(req.body.branch) 
      
  }
var sql='Update user set sem = (?)  WHERE ktuid = (?)';
db.query(sql, [inputData.name,req.session.ktuid] ,function (err, data1, fields) {
if(err) throw err
res.redirect('/dashboard');
   
});
});


router.post('/changemail', function(req, res, next) {
    
  inputData ={
      email: req.body.email
      
  }
 
      var sql='Update user set email = (?)  WHERE ktuid = (?)';
      db.query(sql, [inputData.email,req.session.ktuid] ,function (err, data1, fields) {
        res.redirect('/dashboard');
           
      });
  
});
router.post('/changecollege', function(req, res, next) {
    
  inputData ={
      email: req.body.email
      
  }
 
      var sql='Update user set college = (?)  WHERE ktuid = (?)';
      db.query(sql, [inputData.email,req.session.ktuid] ,function (err, data1, fields) {
        res.redirect('/dashboard');
           
      });
  
});

router.post('/changebranch', function(req, res, next) {
    
  inputData ={
      name: req.body.branch
      
  }
var sql='Update user set branchid = (?)  WHERE ktuid = (?)';
db.query(sql, [inputData.name,req.session.ktuid] ,function (err, data1, fields) {
if(err) throw err
res.redirect('/dashboard');
   
});
});


module.exports = router; 