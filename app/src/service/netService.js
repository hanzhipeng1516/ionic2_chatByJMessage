"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
/**
 * 网络服务
 */
var netService = (function () {
    function netService(http, base64) {
        this.http = http;
        this.base64 = base64;
    }
    /**
     * get请求
     * @param url
     * @param mParam
     * @returns {Promise<TResult|T>}
     */
    netService.prototype.httpGet = function (url, mParam) {
        var params = this.base64.base64encode(mParam);
        console.log("param:  " + params);
        var mUrl = url + "?mData=" + params;
        console.log(mUrl);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(mUrl, options).toPromise()
            .then(function (res) { return res.json(); })
            .catch(function (err) {
            return err;
        });
    };
    /**
     * post请求
     * @param url
     * @param mParam
     * @returns {Promise<TResult|T>}
     */
    netService.prototype.httpPost = function (url, mParam) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, {
            "mData": this.base64.base64encode(mParam)
        }, options).toPromise()
            .then(function (res) { return res; })
            .catch(function (err) {
            return err;
        });
    };
    netService = __decorate([
        core_1.Injectable()
    ], netService);
    return netService;
}());
exports.netService = netService;
