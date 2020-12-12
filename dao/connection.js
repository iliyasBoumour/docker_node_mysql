const mysql = require('mysql');

let connection = mysql.createConnection({
     host: 'localhost',
     port: '3306',
     user: 'root',
     password: 'root',
     database: 'personnages'
   });

   

   connection.connect((err) =>{
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('data base connected as id ' + connection.threadId);
    
});
module.exports=connection