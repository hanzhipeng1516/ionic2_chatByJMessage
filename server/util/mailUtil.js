/**
 *
 * @Description 邮件发送
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor
 * @Created 2016/04/26 15:10
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */
var email= {
    service: 'qq',
    user: '1030137093@qq.com',
    pass: 'nvzdbycawtjqbccg',
}
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: email.service,
    auth: {
        user: email.user,
        pass: email.pass
    }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject,html) {
    smtpTransport.sendMail({
        from: email.user,// 发送者
        to: recipient,// 接受者,可以同时发送多个,以逗号隔开
        subject: subject,// 标题
        html:html
    }, function (error, response) {
        if (error) {
            console.log(error);
            return false;
        }
        console.log(response);
        console.log('发送成功')
        return true;
    });
};
// sendMail("421277300@qq.com","验证码","内容");
exports.sendMail = sendMail;