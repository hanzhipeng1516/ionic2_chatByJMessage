import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {storageService} from "../../../service/storageService";
import {LoginPage} from "../../account/login/login";
import { TabsPage } from '../../tabs/tabs'
import {mGuidePage} from "../mGuide/mGuide";
import {JMessageUtil} from "../../../service/JMessageUtil";
import {userService} from "../../../service/userService";
import {BASE64} from "../../../service/base64"

@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html'
})

export class GuidePage {
  showTime:number=3;
  private timer;
  constructor(
    public navCtrl: NavController,
    public storage:storageService,
    public jMessage:JMessageUtil,
    public uService:userService,
    public base64:BASE64) {
    this.timer=setInterval(() => {
      this.showTime--;
      console.log(this.showTime);
      if(this.showTime==0){
        storage.read("firstIn").then(val=>{
          if(val){
            storage.read("isLogin").then(value=>{
              console.log(value)
              //初始化---- 判断登陆状态
              if(value){
                storage.read("t_user").then(data=>{
                  let user=JSON.parse(JSON.parse(data));
                  // console.log(user);
                  jMessage.userLogin(user.username,base64.base64decode(user.password)).then(d1=>{
                    console.log(d1);
                    navCtrl.push(TabsPage);
                  });
                })
              }
              else{
                navCtrl.setRoot(LoginPage);
              }
            });
          }else{
            navCtrl.push(mGuidePage);
          }
        });
        clearInterval(this.timer);
      }
    }, 1000);
  }
  //初始化极光
  ngOnInit(){
    //运行初始化
    this.jMessage.initJMessage().then(d1=>{

    });
    //每10分钟刷新
    setInterval(() => {
      this.jMessage.initJMessage().then(d1=>{

      });
    }, 600000);

  }
}
