/**
 * 自定义模块 base64
 */
/**
 * 加密编码
 * @param str
 * @returns {String}
 */
var base64encode=function (str) {
    var b = new Buffer(str);
    return b.toString('base64');
};
/**
 * 解密编码
 * @param str
 * @returns {String}
 */
var base64decode=function (str) {
    var a = new Buffer(str, 'base64');
    return a.toString();
};
exports.base64encode = base64encode;
exports.base64decode = base64decode;


