"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var storage_1 = require('@ionic/storage');
/**
 * 存储服务
 */
var storageService = (function () {
    function storageService() {
        this.storage = new storage_1.Storage();
    }
    /**
     * 存储
     * @param key
     * @param value
     */
    storageService.prototype.write = function (key, value) {
        if (value) {
            value = JSON.stringify(value);
        }
        this.storage.set(key, value);
    };
    /**
     * 读取
     * @param key
     * @returns {any}
     */
    storageService.prototype.read = function (key) {
        return this.storage.get(key);
    };
    /**
     * 清除
     * @param key
     */
    storageService.prototype.remove = function (key) {
        this.storage.remove(key);
    };
    /**
     * 清空存储
     */
    storageService.prototype.clear = function () {
        this.storage.clear();
    };
    storageService = __decorate([
        core_1.Injectable()
    ], storageService);
    return storageService;
}());
exports.storageService = storageService;
