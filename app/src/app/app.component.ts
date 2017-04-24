import { Component,ViewChild  } from '@angular/core';

import {Platform,ToastController, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {GuidePage} from "../pages/guide/guide/guide";
import {SQLiteService} from "../service/SQLiteService";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/account/login/login";

@Component({
  templateUrl: 'app.html',
  providers:[SQLiteService]
})
export class MyApp {
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild(Nav) nav: Nav;
  rootPage = GuidePage;
  constructor(
    public platform: Platform,
    public toastCtrl: ToastController,
    ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log("init app");
      //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        //登录页面下
        if(page==LoginPage){
          //当前页面为tabs，退出APP
          return this.showExit();
        }
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            //当前页面为tabs，退出APP
            return this.showExit();
          }
          //当前页面为tabs的子页面，正常返回
          return this.nav.pop();
        }
      }, 101);
    });
  }
  //双击退出提示框，这里使用Ionic2的ToastController
  showExit() {
    if (this.backButtonPressed) this.platform.exitApp();  //当触发标志为true时，即2秒内双击返回按键则退出APP
    else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }


}
