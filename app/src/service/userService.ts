import { Injectable } from '@angular/core';

import {netService} from "./netService";
import {BASE64} from "./base64";
import {storageService} from "./storageService";
// import {SQLiteService} from "./SQLiteService";


@Injectable()
export class userService{
  // private loginUrl:string="http://localhost:3000/users/login";
  // private regUrl:string="http://localhost:3000/users/reg";
  // private foundPwdUrl:string="http://localhost:3000/users/foundPwdUrl";
  // private updateInfoUrl:string="http://localhost:3000/users/updateInfo";
  // private sendEMailUrl:string="http://localhost:3000/common/sendEmail";
  // public uploadAvatarUrl:string="http://localhost:3000/users/uploadAvatar";
  // public updateAvatarInfoUrl:string="http://localhost:3000/users/updateAvatarInfo";

  private loginUrl:string="http://www.hzp1516.cn:3000/users/login";
  private regUrl:string="http://www.hzp1516.cn:3000/users/reg";
  private foundPwdUrl:string="http://www.hzp1516.cn:3000/users/foundPwdUrl";
  private updateInfoUrl:string="http://www.hzp1516.cn:3000/users/updateInfo";
  private sendEMailUrl:string="http://www.hzp1516.cn:3000/common/sendEmail";
  public uploadAvatarUrl:string="http://www.hzp1516.cn:3000/users/uploadAvatar";
  public updateAvatarInfoUrl:string="http://www.hzp1516.cn:3000/users/updateAvatarInfo";


  constructor(
    public net:netService,
    public base64:BASE64,
    private storage:storageService,
    // private db:SQLiteService
  ) {

  }

  /**
   * 用户登录
   * @param param
   * @param callback
   */
  login(param,callback){
    this.net.httpPost(this.loginUrl,param).then(data => {
      let userObj=JSON.parse(this.base64.base64decode(data._body)).data;
      //登录状态
      console.log(userObj);
      if(userObj!=null){
        //成功访问到数据
        this.storage.write("t_user", JSON.stringify(userObj));
        callback(true);
        //本地存储
      }else{
        callback(null);
      }
    });
  }
  /**
   * 发送邮件
   * @param param
   * @param callback
   */
  sendEmail(param,callback){
    this.net.httpPost(this.sendEMailUrl,param).then(data => {
      console.log(data._body);
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 新用户注册
   * @param param
   * @param callback
   */
  reg(param,callback){
    this.net.httpPost(this.regUrl,param).then(data => {
      console.log(data._body);
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 找回密码/重置密码
   * @param param
   * @param callback
   */
  foundPwd(param,callback){
    this.net.httpPost(this.foundPwdUrl,param).then(data => {
      let resultObj=JSON.parse(this.base64.base64decode(data._body));
      console.log(resultObj);
      callback(resultObj);
    });
  }

  /**
   * 读取用户信息
   * @param username
   * @param fn
   */
  getUserInfo(fn){
    this.storage.read("t_user").then(data=>{
      fn(JSON.parse(JSON.parse(data)));
    });
  }

  /**
   * 改变用户信息
   * @param param
   * @param callback
   */
  updateUserInfo(param,callback){
    this.net.httpPost(this.updateInfoUrl,param).then(data => {
      let resultObj=JSON.parse(this.base64.base64decode(data._body));
      console.log(resultObj);
      callback(resultObj);
    });
  }

  /**
   * 上传图片信息
   * @param param
   * @param callback
   */
  // uploadAvatar(param,callback){
  //   this.net.httpPost(this.uploadAvatarUrl,param).then(data=>{
  //     let resultObj=JSON.parse(this.base64.base64decode(data._body));
  //     console.log(resultObj);
  //     callback(resultObj);
  //   })
  // }

  /**
   * 更新头像
   * @param param
   * @param callback
   */
  updateAvatarInfo(param,callback){
    this.net.httpPost(this.updateAvatarInfoUrl,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      console.log(resultObj);
      callback(resultObj);
    })
  }

}
