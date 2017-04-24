"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var tabs_1 = require('../../tabs/tabs');
var reg_1 = require('../reg/reg');
var LoginForm_1 = require('../../../module/LoginForm');
var foundPwd_1 = require("../foundPwd/foundPwd");
var LoginPage = (function () {
    function LoginPage(navCtrl, net, loadingCtrl, base64, storage) {
        this.navCtrl = navCtrl;
        this.net = net;
        this.loadingCtrl = loadingCtrl;
        this.base64 = base64;
        this.storage = storage;
        this.todo = new LoginForm_1.LoginForm("", "");
    }
    LoginPage.prototype.loginForm = function () {
        var _this = this;
        // console.log(this.base64.base64encode("hzp"));
        // console.log(this.base64.base64decode("aHpw"));
        console.log(this.todo);
        var params = this.todo;
        var url = 'http://localhost:3000/users/login2';
        var body = JSON.stringify(params);
        if (params.password != "" && params.username != "") {
            var loader = this.loadingCtrl.create({
                content: "正在登陆",
                duration: 3000,
            });
            loader.onDidDismiss(function () {
                _this.net.httpPost(url, body).then(function (data) {
                    console.log(_this.base64.base64decode(data._body));
                    _this.storage.write("isLogin", { 's': 'true' });
                    _this.storage.read("isLogin").then(function (value) {
                        if (value && value != "undefined" && value != "null") {
                            console.log(JSON.parse(value));
                        }
                    });
                });
                console.log('Dismissed loading');
            });
            loader.present();
        }
        else
            alert("can't be null");
    };
    LoginPage.prototype.toIndexPage = function () {
        this.navCtrl.push(tabs_1.TabsPage);
    };
    LoginPage.prototype.makeNewUser = function () {
        this.navCtrl.push(reg_1.RegPage);
    };
    LoginPage.prototype.foundPwd = function () {
        this.navCtrl.push(foundPwd_1.FoundPwdPage);
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
