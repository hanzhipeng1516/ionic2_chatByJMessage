var express = require('express');
var router = express.Router();
var http = require('http');
var mUtil = require('../util/base64Util');
var db=require('../util/sqlUtil');
var moment = require("moment");

/* GET users listing. */
router.get('/', function(request, response, next) {

});
/**
 * 搜索对应的用户
 */
router.post('/getContactsLike',function (request,response,next) {
    var params=request.body.mData;
    console.log(params);
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    if(obj.pointWord!=""){
        var sql="select * from t_user where username!='"+obj.username+"' and username like '%"+obj.pointWord+"%'";
        console.log(sql);
        db.query(sql,function (err,rows) {
            var res;
            if(rows)
                res = {"data":rows};
            else
                res = {"data":null};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        });
    }
});

/**
 * 发送请求给用户
 */
router.post('/addFriendRequest',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    //1为需要处理请求，2位处理请求（通过），3为处理请求（不同意）
    var sql="insert into addRequest values(null,"+obj.fromUser+",'"+obj.toUser+"',1,'"+obj.why+"')";
    console.log(sql);
    db.query(sql,function (err,rows) {
        var res;
        if(rows)
            res = {"data":true};
        else
            res = {"data":false};
        response.send(mUtil.base64encode(JSON.stringify(res)));
    });
});
/**
 * 需要用户处理的数据条数
 */
router.post('/selectFriendRequestCount',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql="select count(*) as needNum from addRequest where toUser="+obj.toUser+" and isDeal=1";
    console.log(sql);
    db.query(sql,function (err,rows) {
        var res;
        if(rows)
            res = {"data":rows[0]};
        else
            res = {"data":null};
        response.send(mUtil.base64encode(JSON.stringify(res)));
    });
});
/**
 * 需要用户处理的请求
 */
router.post('/selectFriendRequest',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql="select re.id as requestId,re.fromUser,re.toUser,re.id,re.why,u.imgUrl,u.nickname from addRequest re,t_user u where re.toUser="
        +obj.toUser+" and re.fromUser=u.username order by re.id desc";
    db.query(sql,function (err,rows) {
        var res;
        if(rows)
            res = {"data":rows};
        else
            res = {"data":null};
        response.send(mUtil.base64encode(JSON.stringify(res)));
    });
});
/**
 * 处理添加好友请求
 */
router.post('/DealFriendRequest',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    //1为需要处理请求，2位处理请求（通过），3为处理请求（不同意）
    var sql="update addRequest set fromUser='"
        +obj.fromUser+"',toUser='"
        +obj.toUser+"',isDeal="
        +obj.isDeal+",why="+obj.why+" where id="+obj.id;
    console.log(sql);
    db.query(sql,function (err,rows) {
        var res;
        if(rows)
            res = {"data":true};
        else
            res = {"data":false};
        response.send(mUtil.base64encode(JSON.stringify(res)));
    });
});
/**
 * 获得好友信息
 */
router.post('/getFriendInfo',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql="select * from t_user where username='"+obj.username+"'";
    db.query(sql,function (err,rows) {
        var res;
        if(rows)
            res = {"data":rows[0]};
        else
            res = {"data":null};
        response.send(mUtil.base64encode(JSON.stringify(res)));
    });
});

module.exports = router;
