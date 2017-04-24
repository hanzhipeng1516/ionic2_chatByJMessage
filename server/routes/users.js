var express = require('express');
var router = express.Router();
var http = require('http');
var mUtil = require('../util/base64Util');
var db=require('../util/sqlUtil');
var uuid=require('../util/uuid');
var moment = require("moment");

/* GET users listing. */
router.get('/', function(request, response, next) {

});
/**
 * 登录
 */
router.post('/login',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql="select * from t_user where username='"+obj._username+"' and password='"+mUtil.base64encode(obj._password.toString())+"'";
    db.query(sql,function (err, rows) {
        if(rows.length==1){
            var obj=rows[0];
            //刷新token
            var token=uuid.createToken();
            var sql="update t_user set token='"+token+"' where id='"+obj.id+"'";
            console.log(sql);
            db.query(sql,function (err,row) {
                if(row){
                    obj.token=token;
                    res = {"data":obj};
                    response.send(mUtil.base64encode(JSON.stringify(res)));
                }
                else{
                    res = {"data":null};
                    response.send(mUtil.base64encode(JSON.stringify(res)));
                }
            })
        }else{
            res = {"data":null};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        }
    });
});
/**
 * 注册
 */
router.post('/reg',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql="select id from t_user where username='"+obj._username+"'";
    console.log(sql);
    db.query(sql,function (err,rows) {
        //账户名存在
        if(rows.length>0){
            var res = {"data":null};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        }
        //账户名不存在
        else{
            var _id=uuid.createUUID();
            var token=uuid.createToken();
            var sql="insert into t_user(id,username,password,token,createTime) values('"
                +_id+"','"
                +obj._username+"','"
                +mUtil.base64encode(obj._password1.toString())+"','"
                +token+"','"
                +moment().format("YYYY-MM-DD HH:mm:ss")+"')";
            db.query(sql,function (err,rows) {
                var res;
                if(rows)
                    res = {"data":true};
                else
                    res = {"data":false};
                response.send(mUtil.base64encode(JSON.stringify(res)));
            });
        }
    });
});
/**
 * 重置密码
 */
router.post('/foundPwdUrl',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql1="select password from t_user where username='"+obj._username+"'";
    var sql="update t_user set password='"+mUtil.base64encode(obj._password1.toString())+"' where username='"+obj._username+"'";
    db.query(sql1,function (err,rows) {
        var oldPwd=rows[0];
        db.query(sql,function (err,rows) {
            var res;
            if(rows)
                res = {"data":true,"oldPwd":oldPwd};
            else
                res = {"data":false};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        });
    });

});
/**
 * 修改信息
 */
router.post('/updateInfo',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql1="select * from t_user where username='"+obj.username+"' and token='"+obj.token+"'";
    db.query(sql1,function (err,rows) {
        //token未过期
        if(rows.length>0){
            var sql2="update t_user set sex="+obj.sex+",nickname='"+obj.nickname+"',age="+obj.age+" where username='"+obj.username+"'";
            console.log(sql2);
            db.query(sql2,function (err,rows) {
                var res;
                if(rows)
                    res = {"data":true};
                else
                    res = {"data":false};
                response.send(mUtil.base64encode(JSON.stringify(res)));
            });
        }
        //账户名不存在
        else{
            var res = {"data":null};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        }
    });
});

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
/* 上传图片*/
router.post('/uploadAvatar', function(req, res, next){
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/avatarImg/'});
    console.log(req.body);
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/avatarImg/' + new Date().getTime()+"."+inputFile.originalFilename.split(".")[1];
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                    var result = {"data":null};
                    res.send(mUtil.base64encode(JSON.stringify(result)));
                } else {
                    console.log('rename ok');
                    var result = {"data":dstPath};
                    res.send(mUtil.base64encode(JSON.stringify(result)));
                }
            });
        }
    });
});
/**
 * 同步图片信息
 */
router.post('/updateAvatarInfo',function (request,response,next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var sql1="select * from t_user where username='"+obj.username+"' and token='"+obj.token+"'";
    db.query(sql1,function (err,rows) {
        //token未过期
        if(rows.length>0){
            var sql2="update t_user set imgUrl='"+obj.imgUrl+"' where username='"+obj.username+"'";
            console.log(sql2);
            db.query(sql2,function (err,rows) {
                var res;
                if(rows)
                    res = {"data":true};
                else
                    res = {"data":false};
                response.send(mUtil.base64encode(JSON.stringify(res)));
            });
        }
        //账户名不存在
        else{
            var res = {"data":null};
            response.send(mUtil.base64encode(JSON.stringify(res)));
        }
    });
});




module.exports = router;
