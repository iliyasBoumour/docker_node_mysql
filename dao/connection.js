const mysql = require('mysql');

let connection = mysql.createConnection({
     host: 'db',
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