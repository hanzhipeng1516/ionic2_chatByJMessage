import { Component  } from '@angular/core';

import {NavController} from 'ionic-angular';

import { TabsPage } from '../../tabs/tabs'
import { RegPage } from '../reg/reg'

import {LoginForm} from '../../../module/LoginForm'

import {userService} from "../../../service/userService";
import {dialogUtil} from "../../../service/dialogUtil";
import {JMessageUtil} from "../../../service/JMessageUtil";
import {storageService} from "../../../service/storageService";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public navCtrl: NavController,
    private userService:userService,
    private dialog:dialogUtil,
    public jMessage:JMessageUtil,
    public storage:storageService) {
  }


  //初始化登陆表单
  todo = new LoginForm("","");

  /**
   * 登陆
   */
  loginForm(){
    let params=this.todo;
    let body=JSON.stringify(params);
    if(params.password!=""&&params.username!=""){
      const om1=this;
      this.dialog.showLoadingAlert("正在登陆",3000,function () {
        const om2=om1;
        om2.userService.login(body,function (obj) {
          console.log(obj);
          if(obj==null)
            om2.dialog.showAlert("邮箱或密码错误");
          else{
            //极光登录
            om2.jMessage.userLogin(params.username,params.password).then(data=>{
              //标识登录状态
              om2.storage.write("isLogin",true);
              //存入全局用户名
              om2.storage.write("nUserName",params.username);
              om2.toIndexPage();
            });
          }
        });

      })
    }
    else
      this.dialog.showAlert("邮箱和密码不能为空");
  }

  /**
   * 跳转首页
   */
  toIndexPage(){
    this.navCtrl.push(TabsPage);
  }

  /**
   * 注册页面/ 找回密码页面
   */
  toUserManage(type){
    let obj={};
    if(type==1)
      obj={"type":"reg"};
    else
      obj={"type":"found"};
    this.navCtrl.push(RegPage,obj);
  }
}
