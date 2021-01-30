const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const flash=require('connect-flash');
const session=require('express-session');
var Strategy = require('passport-local').Strategy;
var dashboard = require('./routes/userdashboard');
var courses = require('./routes/courses');

const app=express();
const conn=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '12345',
    database: 'eduhack'
})
app.use(express.static('public'));

app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{ //cookie
      httponly: true,
      maxAge:60*60*1000, //set to 1 hour
      secure:false
      }}));


app.use(flash());
//passport middlewares
app.use(passport.initialize());
app.use(passport.session());
//global variables for flash messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//REST APIs
app.get('/register',(req,res)=>{
  res.render('register');
});

app.post('/register',(req,res)=>{
  const { ktuid,name,email,role,password,password2} = req.body;
  let errors=[];
  if(!ktuid || !name || !email || !role || !password || !password2){
     errors.push({msg: 'Input'});
  }
  if(password!==password2){
    errors.push({msg:'Not matching'});
  }
  if(password.length <5){ 
    errors.push({ msg: 'Password should have atleast 5 chars' });
  }
  if(errors.length >0){
    res.render('register',{errors,ktuid,name,email,role,password,password2});
  }
   else {
    conn.query('SELECT ktuid FROM user WHERE ktuid ="' + ktuid +'"', function (err, result) {
        if (err) throw err;
        console.log(result);    
        if(result.length == 0){ 
            bcrypt.genSalt(10, (err, salt) => { 
            bcrypt.hash(password,salt, function(err, hash) {
                var sql = "INSERT INTO user (ktuid,name,email,role,password) VALUES (?,?,?,?,?)";
                var values = [ktuid,name,email,role,hash]
                conn.query(sql,values, function (err, result, fields) {
                if (err) throw err;
                req.flash('success_msg','You are now registered. Do login!');
                res.redirect('/login');
                });
             });
          });
        }
        else{
            errors.push({ msg: 'Email is already registered' });
            res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });               
        }
      });
        
     } 
    });

app.get("/login",(req,res)=>{
  res.render('login');
});



app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/login');
  });

app.post('/login', 
  passport.authenticate('local-login', { 
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
//Authentication using passport
passport.use(
  "local-login",
  new Strategy(
    {
      usernameField: "ktuid",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, ktuid, password, done) {
      console.log(ktuid);
      console.log(password);
      conn.query('SELECT * FROM user WHERE ktuid ="' + ktuid +'"',function(err, rows) {
        console.log(rows);  
        if (err) return done(err);
          if (!rows.length) {
            return done(
              null,
              false,
              {message: "Ktu id not registered"});
          }
          console.log(rows[0].password);
          bcrypt.compare(password,rows[0].password,function(err,result){
            if(result){
              return done(null, rows[0]);
            }
            else{
              return done(
                null,
                false,
                { message: 'Incorrect ktu id or password' });
            }
          });
            
        });
    }
)
);

app.use('/', dashboard );
app.use('/', courses );
//Serialize the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize the user
passport.deserializeUser(function(id, done) {
  conn.query("select * from user where id = " + id, function(
    err,
    rows
  ) {
    done(err, rows[0]);
  });
});


const PORT=process.env.port || 8000;
app.listen(PORT);