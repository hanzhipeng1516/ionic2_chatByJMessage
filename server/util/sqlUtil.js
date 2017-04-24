var mysql=require('mysql');
/**
 * 自定义模块 mysql连接
 */
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database:'ionic_pro_demo1'
});
//新建一個連接
function getNewConnect() {
    return mysql.createConnection(connection.config);
}
//操作数据库方法
function query(sql, callback) {
    connection = getNewConnect();
    connection.connect();
    connection.query(sql,function(err, rows, fields) {
        return callback(err, rows);
    });
    connection.end();
}
exports.query = query;

