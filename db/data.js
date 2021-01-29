const mysql =require('mysql');
var conn = mysql.createConnection({
    connectionList:10,
    password:'12345',
   user:'root',
    database:'eduhack',
    host:'localhost',
    port:'3306',
    dateStrings:true,

})

conn.connect(function(err) {
   if (err) throw err;
   console.log('Database is connected successfully !');
 });
module.exports = conn;
