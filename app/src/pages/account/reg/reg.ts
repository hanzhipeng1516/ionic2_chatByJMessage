import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {userService} from "../../../service/userService";
import {RegForm} from "../../../module/RegForm";
import {validUtil} from "../../../service/validUtil";
import {dialogUtil} from "../../../service/dialogUtil";
import {BASE64} from "../../../service/base64";
import {JMessageUtil} from "../../../service/JMessageUtil";

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  constructor(
    public navCtrl: NavController,
    public userService:userService,
    public valid:validUtil,
    public dialog:dialogUtil,
    public navParam:NavParams,
    public base64:BASE64,
    public jMessage:JMessageUtil) {
      let type=navParam.get("type");
      console.log(type);
      if(type=="reg"){
        this.actionType=true;
        this.topBatTitle="注册";
        this.subBtnTest="注册"
      }else{
        this.actionType=false;
        this.topBatTitle="找回密码";
        this.subBtnTest="重置密码"
      }

  };
  actionType:boolean;
  subBtnTest:string;
  topBatTitle:string;
  //初始化按钮可点击
  buttonDisabled:boolean=false;
  //倒计时时长
  showTime:number=60;
  //按钮显示文字
  sendBtn="获取验证码";
  //定时器
  private timer;
  //验证码
  valCode="";

  /**
   * 发送邮箱验证码
   */
  sendEmail(){
    const obj=this.mForm;
    const uName=obj.username;
    if(this.valid.isEmply(uName))
      this.dialog.showAlert("email不能为空");
    else if(this.valid.emailValidator(uName))
      this.dialog.showAlert("email格式不正確");
    else{
      //  渲染视图
      // 每一秒更新时间差
      this.timer = setInterval(() => {
        if(this.showTime<=0)
        {
          this.buttonDisabled=false;
          this.sendBtn="获取验证码";
          // 销毁组件时清除定时器
          clearInterval(this.timer);
          this.showTime=60;
        }else{
          this.buttonDisabled=true;
          this.showTime--;
          this.sendBtn=(this.showTime+1)+"s后获取";
        }
      }, 1000);
      //生成验证码--并保存
      this.valCode=this.valid.createRandomCode(6);
      console.log(this.valCode);
      let param={"email":uName,"ValidCode":this.valCode};
      let body=JSON.stringify(param);
      this.userService.sendEmail(body,function (res) {
        if(res)
          console.log(res);
        else
          this.dialog.showAlert("邮件发送失败！请稍后再试")
      });
    }
  }
  //提交表单
  mForm=new RegForm("","","","");

  /**
   * 注册新用户
   */
  regForm(){
    const obj=this.mForm;
    const uName=obj.username;
    const code=obj.validCode;
    const pwd1=obj.password1;
    const pwd2=obj.password2;
    //验证
    if(this.valid.isEmply(uName))
      this.dialog.showAlert("email不能为空");
    else if(this.valid.emailValidator(uName))
      this.dialog.showAlert("email格式不正確");
    else if(this.valid.isEmply(pwd1))
      this.dialog.showAlert("密码不能为空");
    else if(pwd1.length<6)
      this.dialog.showAlert("密码长度要大于6位");
    else if(this.valid.isEmply(pwd2))
      this.dialog.showAlert("请重复输入密码");
    else if(pwd1!=pwd2)
      this.dialog.showAlert("兩次输入的密码不同！");
    else if(code!=this.valCode)
      this.dialog.showAlert("邮箱验证码错误！");
    else{
        const om=this;
        this.dialog.showLoadingAlert("正在提交",3000,function () {
          const om2=om;
          let params=om.mForm;
          let body=JSON.stringify(params);
          if(om.actionType==true){
            console.log("开始注册！");
            om2.userService.reg(body,function (obj) {
              if(obj==null)
                om2.dialog.showAlert("该邮箱已存在！");
              else if(obj==false)
                om2.dialog.showAlert("注册失败！请稍后再试......");
              else
                om2.dialog.showAlert_callback("注册成功",function () {
                  //同步极光
                  //注册
                  om2.jMessage.userReg(params.username,params.password1).then(d2=>{
                    console.log(d2);
                    om2.toBack();
                  });
                });
            });
          }else{
            console.log("开始重置！");
            om2.userService.foundPwd(body,function (obj) {
              console.log(obj);
              if(obj.data==true)
                om2.dialog.showAlert_callback("重置成功",function () {
                  let oPwd=om2.base64.base64decode(obj.oldPwd.password);
                  console.log(oPwd+":  "+pwd1);
                  //更新密码
                  om2.jMessage.userLogin(params.username,oPwd).then(d1=>{
                    om2.jMessage.updateSelfPwd(oPwd,params.password1).then(d2=>{
                      om2.toBack();
                    })
                  });
                  //
                });
              else
                om2.dialog.showAlert("重置密码失败！请稍后再试");
            });
          }

        })
    }
  }



  /**
   * 返回上个页面
   */
  toBack(){
    this.navCtrl.pop();
  }
}
