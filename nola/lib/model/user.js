const mysql_conn    = require("../mysql_connection");
const _             = require('underscore');
const table_name    = 'users';
const _self         = {};


_self.processgetUsers = (options, callback)=> {
    var sql = 'SELECT * FROM '+table_name+' where in_ride = false';
    mysql_conn.query(sql, (err, response) =>{
        if(err) return callback(err);
        callback(null, response)
    });
}


module.exports = _self;