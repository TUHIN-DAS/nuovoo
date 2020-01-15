const {Client} = require('pg');

const client = new Client({
		"host" : "localhost",
		"user" : "postgres",
		"password" : "root",
    "database" : "nuovoo",
    "port" : 5432
})

const DB_CONN_ERROR = {
  error : true,
  msg : "Connection to database failed."
}

const DB_QUERY_ERROR = {
  error : true,
  msg : "Not able to fetch data from database."
}

module.exports = class DBUtils {

  executeQuery(query, res, next)
  {
     let result = null;
     this.con.connect((err) => {
        if (err) 
          return DB_CONN_ERROR;
        this.con.query(query, (err, rows, fields) => {
          if (err) 
            return DB_QUERY_ERROR;
          res.json(rows);
          this.con.end();
        });
    });
  }

  executeQueryAsync(query,req,res,next,callback)
  {
     console.log(query);
     let result = null;
     client.connect((err) => {
        if (err) {
          return DB_CONN_ERROR;
        }
        client.query(query, (err, data, fields) => {
          if (err) {
            return DB_QUERY_ERROR;
          }
          client.end();
          if(callback)
            callback(data.rows,req,res,next);
          else
            res.json({data : rows, success : true});
        });
    });
  }

  validateConnection(res, next)
  {
    let result = null;
    this.con.connect((err) => {
       if (err) next(err);
       else
         res.json({"success" : true});
       this.con.end();
   });
  }
}
