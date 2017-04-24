import {Component} from "@angular/core";
import {NavController, ActionSheetController, NavParams} from "ionic-angular";
import { Camera } from 'ionic-native';
import { Transfer } from 'ionic-native';

import {MyInfoPage} from "../myinfo/myInfo";
import {userService} from "../../../service/userService";
import {storageService} from "../../../service/storageService";
import {dialogUtil} from "../../../service/dialogUtil";
import {LoginPage} from "../login/login";
import {JMessageUtil} from "../../../service/JMessageUtil"
import {BASE64} from "../../../service/base64";

@Component({
  selector:"page-accountHome",
  templateUrl:"./accountHome.html"
})
export class accountHome{
  userInfo={
    username:null,
    imgUrl:null,
    token:null
  };
  constructor(
    private navCtrl:NavController,
    public actionSheetCtrl: ActionSheetController,
    public userService:userService,
    public storage:storageService,
    public param:NavParams,
    public dialog:dialogUtil,
    public jMessage:JMessageUtil,
    public base64:BASE64,
  ){

  }

  ionViewDidEnter(){

  }

  ngOnInit(){
    let obj=this;
    obj.userService.getUserInfo(result=>{
      this.userInfo=result;
      if(result.imgUrl==null)
        this.userInfo.imgUrl="assets/img/emplyAvatar.jpg";
      console.log(this.userInfo);
    })
  }

  toMyInfoPage(){
      this.navCtrl.push(MyInfoPage,{userInfo:this.userInfo});
  }

  /**
   * 上传头像
   */
  updateAvater(){
    let obj=this;
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          handler: () => {
            Camera.getPicture({
              destinationType: Camera.DestinationType.DATA_URL,
              targetWidth: 1000,
              targetHeight: 1000
            }).then((imageData) => {
              let p1="data:image/jpeg;base64," + imageData;
              obj.dialog.showLoadingAlert("正在上传",5000,()=>{
                const fileTransfer = new Transfer();
                let options: any;
                options = {
                  headers: {}
                }
                fileTransfer.upload(p1,obj.userService.uploadAvatarUrl, options)
                  .then((data) => {
                    let resultObj = JSON.parse(obj.base64.base64decode(data.response));
                    if(resultObj!=null){
                      let param={
                        username:obj.userInfo.username,
                        imgUrl:resultObj.data,
                        token:obj.userInfo.token,
                      };
                      let body=JSON.stringify(param);
                      obj.userService.updateAvatarInfo(body,data=>{
                        if(data!=null){
                          if(data){
                            console.log(param);
                            obj.dialog.showAlert_callback("上传成功",()=>{
                              // imageData is a base64 encoded string
                              obj.userInfo.imgUrl = "data:image/jpeg;base64," + imageData;
                              //更新缓存
                              obj.storage.write("t_user",JSON.stringify(obj.userInfo));
                            });
                          }else{
                            obj.dialog.showAlert("上传失败，请稍后再试!");
                          }
                        }else{
                          //token不通过
                          obj.dialog.showAlert_callback("登录状态过期！请重新登录",()=>{
                            obj.navCtrl.push((LoginPage));
                          })
                        }
                      });
                    }else{
                      obj.dialog.showAlert("上传失败，请稍后再试!");
                    }
                  }, (err) => {
                    // error
                    console.log(err);
                    obj.dialog.showAlert("上传失败");
                  })
              });
            }, (err) => {
              console.log(err);
            });
          }
        },{
          text: '从相册中选择',
          handler: () => {
            Camera.getPicture({
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            }).then((imageData) => {
              obj.dialog.showLoadingAlert("正在上传",5000,()=>{
                const fileTransfer = new Transfer();
                let options: any;
                options = {
                  headers: {}
                };
                fileTransfer.upload(imageData,obj.userService.uploadAvatarUrl, options)
                  .then((data) => {
                    let resultObj = JSON.parse(obj.base64.base64decode(data.response));
                    if(resultObj!=null){
                      let param={
                        username:obj.userInfo.username,
                        imgUrl:resultObj.data,
                        token:obj.userInfo.token,
                      };
                      let body=JSON.stringify(param);
                      obj.userService.updateAvatarInfo(body,data=>{
                        if(data!=null){
                          if(data){
                            console.log(param);
                            obj.dialog.showAlert_callback("上传成功",()=>{
                              // imageData is a base64 encoded string
                              obj.userInfo.imgUrl = "data:image/jpeg;base64," + imageData;
                              //更新缓存
                              obj.storage.write("t_user",JSON.stringify(obj.userInfo));
                            });
                          }else{
                            obj.dialog.showAlert("上传失败，请稍后再试!");
                          }
                        }else{
                          //token不通过
                          obj.dialog.showAlert_callback("登录状态过期！请重新登录",()=>{
                            obj.navCtrl.push((LoginPage));
                          })
                        }
                      });
                    }else{
                      obj.dialog.showAlert("上传失败，请稍后再试!");
                    }
                  }, (err) => {
                    // error
                    console.log(err);
                    obj.dialog.showAlert("上传失败");
                  })
              })
              // imageData is a base64 encoded string
              this.userInfo.imgUrl = "data:image/jpeg;base64," + imageData;
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * 登出
   */
  toLoginOut(){
    let obj=this;
    this.dialog.showConfirm("提示","您确认登出吗？",
      ()=>{},()=>{
        //清空与登录状态有关的信息
        obj.storage.remove("isLogin");//是否登录
        obj.storage.remove("nUserName");//用户名
        obj.storage.remove("t_user");//用户基本信息
        obj.storage.remove("userInfoType");//用户存储数据方式
        // obj.storage.remove("conversations");//聊天列表
        obj.navCtrl.push(LoginPage);
        console.log("登出操作");
    });
  }

}
