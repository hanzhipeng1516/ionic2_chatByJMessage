var express = require('express');
var router = express.Router();

var codeUtil=require('../util/codeUtil');
var emailUtil=require('../util/mailUtil');
var mUtil=require('../util/base64Util');

/**
 * 发送邮件给用户
 */
router.post('/sendEmail', function(request, response, next) {
    var params=request.body.mData;
    //解密后转换成JSON
    var obj=JSON.parse(mUtil.base64decode(params));
    var state=emailUtil.sendMail(obj.email,"验证码","<h2>您的验证码为："+obj.ValidCode+" 有效期为：5分钟</h2>");
    if(!state)
        response.send(mUtil.base64encode(JSON.stringify({"data":true})));
    else
        response.send(mUtil.base64encode(JSON.stringify({"data":false})));
});

module.exports = router;