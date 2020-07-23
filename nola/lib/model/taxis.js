const mysql_conn    = require("../mysql_connection");
const _             = require('underscore');
const ride_history    = 'ride_history';
const cabs    = 'cabs';
const users  = 'users';
const _self         = {};


_self.processgetCabRides = (cab_id,callback) => {
    var sql = "SELECT * from ?? where cab_id = ?)";
    var arr = [ride_history, cab_id];
    sql = mysql_conn.format_query(sql, arr);
    mysql_conn.query(sql, callback);
}


_self.processgetCabs = (callback) => {
    var sql = 'SELECT * from ?? where available = true';
    var arr = [table_name];
    sql = mysql_conn.format_query(sql, arr);
    console.log(sql);
    mysql_conn.query(sql, callback);
}

_self.add = (opts,table_name,callback) => {
    if(_.isEmpty(opts)) return ('Invalid options to insert data in'+ table_name);
    var arr = [table_name, opts];
    mysql_conn.add(arr, callback);
};

_self.update =  (id, opts,table_name ,callback) => {
    if(_.isEmpty(opts)) return ('Invalid options to update data in'+ table_name);
    var arr = [table_name, opts, id];
    mysql_conn.update(arr, callback);
};


module.exports = _self;