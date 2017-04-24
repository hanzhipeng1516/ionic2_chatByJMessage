import { Injectable } from '@angular/core';
import {BASE64} from "./base64";
//引入jmessage
declare let JMessage:any;

@Injectable()
export class JMessageUtil{
  public JIM = new JMessage();
  constructor(
    public base64:BASE64
  ){
  }

  /**
   * 初始化方法
   * @returns {Promise<T>}
   */
  initJMessage(){
    let appkey="4369d2da94a791af4b298479";
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let random_str = '';
    for (let i = 0; i < 20; i++) {
      random_str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    let timestamp=new Date().getTime();
    let secret="1a624d3cdcf8654de03aa780";
    let signature = this.base64.hex_md4("appkey="+appkey+"&timestamp="+timestamp+"&random_str="+random_str+"&key="+secret);
    console.log(signature);
    let obj=this;
    return new Promise(function (resolve) {
      obj.JIM.init({
        "appkey": appkey,
        "random_str": random_str,
        "signature": signature,
        "timestamp": timestamp
      }).onSuccess(function (data) {
        resolve(data);
      }).onFail(function (data) {
        console.log('error:' + JSON.stringify(data))
      });
    })
  }
  /**
   * 登录
   * @param username
   * @param password
   */
  userLogin(username:string,password:string){
    let obj=this;
    return new Promise(resolve=>{
        obj.JIM.login({
          'username': username,
          'password': password
          //'is_md5' : '<is_md5>可选参数，密码是否为md5加密的密码，默认为false
        }).onSuccess(function (data) {
          if (data.code == 0) {
            // console.log('登陆成功，会返回用户名');
            resolve(data);
          } else if (data.code == 880104) {
            //更多错误请参照错误代码列表
            console.log('登录失败，密码错误');
          }
        }).onFail(function (data) {
          console.log('error:' + JSON.stringify(data))
        });
    });
  }

  /**
   * 用户注册
   * @param username
   * @param password
   * @returns {Promise<T>}
   */
  userReg(username:string,password:string){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.register({
        'username': username,
        'password': password
        //'is_md5' : '<is_md5>可选参数，密码是否为md5加密的密码，默认为false
      }).onSuccess(function (data) {
        if (data.code == 0) {
          // console.log('注册成功');
          resolve(data);
        } else {
          //更多错误请参照错误代码列表
          console.log('注册失败'+data);
        }
      }).onFail(function (data) {
        console.log('error:' + JSON.stringify(data))
      });
    });
  }

  /**
   * 修改密码
   * @param oldPwd
   * @param nPwd
   * @returns {Promise<T>}
   */
  updateSelfPwd(oldPwd:string,nPwd:string){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.updateSelfPwd({
        'old_pwd' :oldPwd,
        'new_pwd' : nPwd,
        // 'is_md5' : ''
      }).onSuccess(function(data) {
        // do something
        if (data.code == 0) {
          console.log('修改成功');
          resolve(data);
        } else {
          //更多错误请参照错误代码列表
          console.log('注册失败'+data);
        }
      }).onFail(function(data) {
        // do something
      });
    });
  }

  /**
   * 更新用户信息
   * @param nickname
   * @param sex
   * @returns {Promise<T>}
   */
  updateSelfInfo(nickname:string,sex:string){
    let obj=this;
    return new Promise((resolve)=>{
      obj.JIM.updateSelfInfo({
        'nick_name' : nickname,
        // 'birthday' : '',
        // 'signature' : '',
        'gender' :sex,
        // 'region' : '',
        // 'address' : ''
      }).onSuccess(function(data) {
        console.log(data);
        resolve(data);
        // do something
      }).onFail(function(data) {
        // do something
        console.log(data);
      });
    });

  }

  /**
   * 获得对话列表
   * @returns {Promise<T>}
   */
  getConversation(){
    let obj=this;
    return new Promise(resolve=> {
      obj.JIM.getConversation().onSuccess(function (data) {
        console.log('success:' + JSON.stringify(data));
        resolve(data.conversations);
      }).onFail(function (data) {
        console.log('error:' + JSON.stringify(data))
      });
    });
  }

  /**
   * 获得好友列表
   * @returns {Promise<T>}
   */
  getFriendList(){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.getFriendList().onSuccess(function(data) {
        resolve(data.friend_list);
      }).onFail(function(data) {
        console.log(data);
      });
    })
  }

  /**
   * 添加好友请求
   * @param username
   * @param type
   * @param why
   * @returns {Promise<T>}
   */
  addFriend(username:string,type:number,why:string){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.addFriend({
        'target_name' : username ,
        'from_type' : type,
        'why' : why,
      }).onSuccess(function(data) {
        // do something
        resolve(data);
      }).onFail(function(data) {
        // do something
        console.log(data);
      });
    })
  }

  /**
   * 消息监听方法
   * @returns {Promise<T>}
   */
  onMsgReceive(){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.onMsgReceive(function(data) {
        // 聊天消息处理
        resolve(data.messages);
      });
    })
  }


  /**
   * 发送文本消息
   * @param toUser
   * @param toUserNickName
   * @param content
   * @returns {Promise<T>}
   */
  sendSingleMsg(toUser,toUserNickName,content,){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.sendSingleMsg({
        'target_username' : toUser,
        'target_nickname' : toUserNickName,
        'content' :content,
        // 'appkey' : '<targetAppkey>',
        // 'extras' : 'json object'
      }).onSuccess(function(data , msg) {
        console.log(data);
        console.log(msg);
        resolve(data.code);
        // do something
      }).onFail(function(data) {
        // do something
        console.log(data);
      });
    })
  }

  /**
   * 上传头像
   * @param img
   * @returns {Promise<T>}
   */
  updateSelfAvatar(img){
    let obj=this;
    return new Promise(resolve=>{
      obj.JIM.updateSelfAvatar({
        'avatar' : img
      }).onSuccess(function(data) {
        // do something
        console.log(data);
        resolve(data);
      }).onFail(function(data) {
        // do something
        console.log(data);
      });
    })
  }




}
