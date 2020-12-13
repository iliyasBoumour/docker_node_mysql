const connection=require("./connection");


module.exports={
    getAll(fun){
        connection.query("select * from personnages", function (err, result, fields) {
            fun(result)
          });
    },
    addNew(pers){
        const sql = 'INSERT INTO personnages SET ?';
    const query = connection.query(sql, pers, (err, result) => {
      if (err) throw err;
    });
    }
  };
