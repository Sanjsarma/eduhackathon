const express=require('express');
const expressLayouts=require('express-ejs-layouts');
var router = express.Router();
var db=require('../db/data');

router.post("/course",require('connect-ensure-login').ensureLoggedIn(),
function(req, res){
       
    var cid = req.body.course;
    var sql='SELECT cname,syllabus  FROM courses WHERE courseid = (?) ';
   
    db.query(sql, [cid], function (err, data, fields) {
         req.session.cname=data[0].cname;
         syllabus= data[0].syllabus;
         console.log(data);
         var tp=[]
         var video=[]
         var note=[]
         var qp=[]
         var tb=[]
         var sql='select * from  qp where courseid = (?) ;';
        db.query(sql, [cid,i], function (err, data1, fields) {
          console.log(data1)
            data1 .forEach(function(v){ qp.push(v.link); 
              })
        });
        var sql='select * from  text where courseid = (?) ;';
        db.query(sql, [cid,i], function (err, data1, fields) {
          console.log(data1)
            data1 .forEach(function(v){ tb.push(v); 
              })
        });
         for(var i =1;i<=6;i++){
         var sql='select * from  materials where courseid = (?) and mod_no=(?);';
        db.query(sql, [cid,i], function (err, data1, fields) {
          console.log(data1)
            data1 .forEach(function(v){ tp.push(v.Tp_link); 
              video.push(v.video_link);
              note.push(v.Notes_link);})
        });
      }
      setTimeout(function1,200);
      function function1 ()
      {
        console.log(tp);
      res.render('course',{cname:req.session.cname,cid:cid,syllabus:syllabus,video:video,note:note,tp:tp,qp:qp,tb:tb});
      }
    });
   
  
   



  

});

module.exports = router; 