
let _self = {};

const config      = require('../config.json');
const mysql       = require('mysql');

const mysql_pool = mysql.createPool(config.mysql[process.env.NODE_ENV]);
 

_self.createConnection = (callback) =>{
    mysql_pool.getConnection((err,connection)=>{
        if (err) {
            console.log('pool connect error on ',err);
            return callback(null);
        }
        return callback(connection);
    });
}

_self.query = (sql,callback)=> {
    _self.createConnection( (connection)=> {

        if (!connection || connection==null) 
            return callback('Connection error on '+sql,null);

        connection.query(sql,(err,rows,fields) => {
            connection.release();
            if(err) {
                console.log('SQL query error on '+sql,err);
                return callback(err);
            }
            callback(null,rows);
        });

    });
}

_self.add =  (arr, callback) => {
    if(arr.length < 2) 
        return callback('Need both table name and field value to insert data');

    var sql = "INSERT INTO ?? SET ?";
        sql = _self.format_query(sql, arr);
    _self.query(sql,callback);
};

_self.update =  (arr, callback) =>{
    if(arr.length != 3) 
        return callback('Need table name, field value and Id to update data');
    
    var sql = "UPDATE ?? SET ? WHERE id=?";
        sql = _self.format_query(sql, arr);
    _self.query(sql,callback);
};

_self.format_query =  (sql, arr) =>{ 
    return mysql.format(sql,arr); 
};

module.exports = _self;