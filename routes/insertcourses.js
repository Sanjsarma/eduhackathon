const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session=require('express-session');
var router = express.Router();
var db=require('../db/data');

router.get('/insertcourses',function(req,res){
    message = ''
    res.render('insertcourses', {message:message});
});
router.post('/insertcourses',(req,res)=>{
    message = '';
   
      var post  = req.body;
      var courseid= post.courseid;
      var cname= post.cname;
      var sem=post.sem;
      var branchid=post.branchid;
      console.log(courseid);
	  if (!req.files){
            console.log("Error");
            }
		var file = req.files.uploaded_image;
		var img_name=file.name;
 
	  	 if(file.mimetype == "image/jpeg" || file.mimetype=="image/jpg" || file.mimetype == "image/png"||file.mimetype == "image/gif" || file.mimetype=="image/webp"){
                                 
              file.mv('public/images/'+file.name, function(err) {
               if (err)
	                return res.status(500).send(err);
      			var sql = "INSERT INTO courses(courseid,cname,sem,branchid,link) VALUES (?,?,?,?,?)";
                var newItem=[courseid,cname,sem,branchid,img_name];
    			db.query(sql, newItem,function(err, result) {
    				 res.redirect('/');
    				});
				});
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('insertcourses.ejs',{message: message});
          }
});
module.exports = router; 