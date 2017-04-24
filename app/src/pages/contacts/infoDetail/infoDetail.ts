import { Component } from '@angular/core';
import {JMessageUtil} from "../../../service/JMessageUtil";

import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {storageService} from "../../../service/storageService";
import {contactsService} from "../../../service/contactsService";
import {dialogUtil} from "../../../service/dialogUtil";
import {ChatViewPage} from "../../chat/chatView/chatView";
// import {userService} from "../../../service/userService";

@Component({
  selector: 'page-infoDetail',
  templateUrl: './infoDetail.html'
})
export class InfoDetail {
  public mTitle;
  public item;
  public actionType;
  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl:ActionSheetController,
    public params:NavParams,
    public jMessage:JMessageUtil,
    public storage:storageService,
    public conService:contactsService,
    public dialog:dialogUtil) {
    this.actionType=this.params.get('actionType');
    this.item= this.params.get('item');
    this.mTitle=this.item.nickname;
  }
  //初始化
  ngOnInit(){
    console.log(this.item);
    console.log(this.actionType);
  }

  /**
   * 申请添加好友
   * @param toUser
   */
  addFriendBtn(toUser){
    let om=this;
    this.storage.read("nUserName").then(fromUser=>{
      om.dialog.showPrompt("验证信息","请输入验证信息","why",
        d1=>{
        console.log(d1);
        },
        d2=>{
          let params={
            fromUser:fromUser,
            toUser:toUser,
            why:d2.why
          };
          let body=JSON.stringify(params);
          om.dialog.showLoadingAlert("添加中...",3000,()=>{
            om.conService.addFriendReq(body,result=>{
              if(result)
                om.dialog.showAlert_callback("请求成功，请等候用户同意",()=>{
                  //同步极光
                  om.jMessage.addFriend(toUser,1,d2.why).then(data=>{
                    console.log(data);
                    om.navCtrl.pop();
                  });
                });
              else
                om.dialog.showAlert("请求失败，请稍后再试");
            })
          });
      });
    })
  }

  moreAction(item){
    let obj=this;
    let actionSheet = this.actionSheetCtrl.create({
      title: '操作',
      buttons: [
        {
          text: '删除好友',
          role: 'destructive',
          handler: () => {
            obj.dialog.showConfirm("警告","您确定删除该好友吗？",()=>{},()=>{
              console.log("删除好友");
              console.log(item);
            })
          }
        },{
          text: '备注',
          handler: () => {
            obj.dialog.showPrompt("修改备注","请输入备注","bz",d1=>{},d2=>{
              console.log("修改备注: "+ d2.bz)
            });
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * 开始聊天
   * @param username
   */
  startChat(username,nickname){
    this.navCtrl.push(ChatViewPage,{"username":username,"nickname":nickname});
  }

}
