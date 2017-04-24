var express = require('express');
var router = express.Router();
var http = require('http');

/* GET users listing. */
router.get('/', function(request, response, next) {

});

//新闻
router.get('/news', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    http.get("http://v.juhe.cn/toutiao/index?type="+obj.type+"&key=af035950b9d01e124502f928547c020a", function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});

//NBA赛讯
router.get('/nba', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var str="";
    //常规赛赛果
    if(obj.type==1)
        str="http://op.juhe.cn/onebox/basketball/nba?&key=beea7b3465adb1a349a5d405c7239d5f";
    //赛程赛事
    else if(obj.type==2)
        str="http://op.juhe.cn/onebox/basketball/team?key=beea7b3465adb1a349a5d405c7239d5f&team="+obj.team;
    //对战赛赛程
    else if(obj.type==3)
        str="http://op.juhe.cn/onebox/basketball/combat?key=beea7b3465adb1a349a5d405c7239d5f&hteam="+obj.hteam+"&vteam="+obj.vteam;
    http.get(str, function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});
//FIFA赛讯
router.get('/soccer', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var str="";
    //联赛赛事查询
    if(obj.type==1)
        str="http://op.juhe.cn/onebox/football/league?key=2fd164beafff41725b40912a457b3c38&league="+obj.league;
    //赛事查询
    else if(obj.type==2)
        str="http://op.juhe.cn/onebox/football/team?key=2fd164beafff41725b40912a457b3c38&team="+obj.team;
    //球队对战赛程查询
    else if(obj.type==3)
        str="http://op.juhe.cn/onebox/football/combat?key=2fd164beafff41725b40912a457b3c38&hteam="+obj.hteam+"&vteam="+obj.vteam;
    http.get(str, function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});

//看电影
router.get('/file', function(request, response, next) {
    http.get("http://v.juhe.cn/wepiao/query?key=e0b75ffbf4a4d57c1eec3e34a5f7de94", function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});

//星座运势
router.get('/constellation', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    http.get("http://web.juhe.cn:8080/constellation/getAll?consName="+obj.consName+"&type="+obj.type+"&key=795df0934da9dc86775c6206c9cb5f38", function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});

//天气预报
router.get('/weather', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    http.get("http://op.juhe.cn/onebox/weather/query?cityname="+obj.cityname+"&key=cd91d98731ded291cb55824a3c423940", function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});

//问答机器人
router.get('/robot', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    http.get("http://op.juhe.cn/robot/index?info="+obj.info+"&key=70fcbbb972ce44e8e219cf4719e02f44", function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});


//公交线路
router.get('/bus', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var str="";
    //公交线路查询
    if(obj.type==1)
        str=" http://op.juhe.cn/189/bus/busline?key=4846d145437764f32231d767f533a2b9&city="+obj.city+"&bus="+obj.bus;
    //公交站经往车辆
    else if(obj.type==2)
        str="http://op.juhe.cn/189/bus/station?key=4846d145437764f32231d767f533a2b9&city"+obj.city+"&station="+obj.station;
    http.get(str, function (res) {
        res.setEncoding('binary');  //二进制binary
        var type = res.headers["content-type"];
        var Data = '';
        res.on('data', function (data) {    //加载到内存
            Data += data;
        }).on('end', function () {          //加载完
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*', "Content-Type": type });   //设置头，允许跨域
            response.write(Data , "binary");
            response.end();
        })
    })
});




module.exports = router;