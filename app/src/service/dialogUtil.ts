import { Injectable } from '@angular/core';
import { AlertController,ToastController,LoadingController } from 'ionic-angular';
/**
 * 对话框
 */
@Injectable()
export class dialogUtil{
  constructor(
    public dialogCtrl:AlertController,
    public toastCtrl: ToastController,
    public loadCtrl:LoadingController
  ){

  }

  /**
   * 加载弹窗
   * @param msg
   * @param time
   * @param callback
   */
  showLoadingAlert(msg,time,callback){
    let loader = this.loadCtrl.create({
      content: msg,
      duration: time,
    });
    loader.onDidDismiss(()=>{
      callback();
      console.log('Dismissed loading');
    });
    loader.present();
  }

  /**
   * 普通弹出框
   * @param msg
   */
  showAlert(msg) {
    let alert = this.dialogCtrl.create({
      title:"提示",
      subTitle: msg,
      buttons: [
        '好的'
      ]
    });
    alert.present();
  }

  /**
   * 普通弹出框回调处理
   * @param msg
   * @param fn
   */
  showAlert_callback(msg,fn){
    let alert = this.dialogCtrl.create({
      title:"提示",
      subTitle: msg,
      buttons: [
        {
          text:'好的',
          handler:()=>{
            fn();
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * 输入弹出框
   * @param title
   * @param msg
   * @param inputTitle 输入框名字
   * @param callback1 取消按钮方法
   * @param callback2 提交按钮方法
   */
  showPrompt(title,msg,inputTitle,callback1,callback2) {
    let prompt = this.dialogCtrl.create({
      title: title,
      message: msg,
      inputs: [
        {
          name: inputTitle,
          placeholder: '请输入'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
            callback1(data);
          }
        },
        {
          text: '确认',
          handler: data => {
            console.log('Saved clicked');
            callback2(data);
          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * 选择弹出框
   * @param title
   * @param msg
   * @param callback1
   * @param callback2
   */
  showConfirm(title,msg,callback1,callback2) {
    let confirm = this.dialogCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
            callback1();
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');
            callback2();
          }
        }
      ]
    });
    confirm.present();
  }

  ShowToast(msg,time) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: time,
      position:'top'
    });
    toast.present();
  }

}
