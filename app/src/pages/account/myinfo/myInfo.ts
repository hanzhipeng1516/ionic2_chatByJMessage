import { Component } from '@angular/core';

import {NavController, NavParams, AlertController} from 'ionic-angular';

import {userService} from "../../../service/userService";
import {dialogUtil} from "../../../service/dialogUtil";
import {storageService} from "../../../service/storageService";
import {accountHome} from "../accountHome/accountHome";
import {LoginPage} from "../login/login";
import {JMessageUtil} from "../../../service/JMessageUtil";

@Component({
  selector: 'page-myInfo',
  templateUrl: 'myInfo.html',
})
export class MyInfoPage {
  userInfo={
    sex:"0",
    nickname:'',
  };
  constructor(
    public navCtrl: NavController,
    private userService:userService,
    private dialog:dialogUtil,
    private alertCtrl:AlertController,
    private storage:storageService,
    public jMessage:JMessageUtil,
    public param:NavParams) {
    this.userInfo=param.get("userInfo");
  }

  /**
   * 提交表单
   */
  subForm(){
    let obj=this;
    this.dialog.showLoadingAlert("正在更新",3000,()=>{
      let param=this.userInfo;
      let body=JSON.stringify(param);
      console.log(this.userInfo);
      obj.userService.updateUserInfo(body,result=>{
        //token通过
        if(result.data!=null){
            if(result.data){
              console.log(param);
              //同步极光
              obj.jMessage.updateSelfInfo(param.nickname,param.sex).then(data=>{
                //更新本地数据
                obj.dialog.showAlert_callback("更新成功!",()=>{
                  obj.storage.write("t_user",body);
                  // obj.navCtrl.popTo(accountHome,{'isFlash':true});
                  obj.navCtrl.popTo(accountHome);
                });
              });
            }else{
              obj.dialog.showAlert("更新失败，请稍后再试!");
            }
        }else{
          //token不通过
          obj.dialog.showAlert_callback("登录状态过期！请重新登录",()=>{
            obj.navCtrl.push((LoginPage));
          })
        }
      })
    })

  }

  /**
   * 选择性别
   */
  chooseSex() {
    let alert = this.alertCtrl.create();
    alert.addInput({
      type: 'radio',
      label: '男',
      value: '1',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: '女',
      value: '2',
      checked: false
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        this.userInfo.sex=data;
        console.log(this.userInfo.sex);
      }
    });
    alert.present();
  }


}
