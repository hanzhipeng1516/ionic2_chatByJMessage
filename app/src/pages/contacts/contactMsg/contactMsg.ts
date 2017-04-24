import { Component } from '@angular/core';
import {JMessageUtil} from "../../../service/JMessageUtil";

import { NavController } from 'ionic-angular';
import {contactsService} from "../../../service/contactsService";
import {storageService} from "../../../service/storageService";
import {InfoDetail} from "../infoDetail/infoDetail";
import {dialogUtil} from "../../../service/dialogUtil";

@Component({
  selector: 'page-contactMsg',
  templateUrl: './contactMsg.html'
})
export class ContactsMsg {
  constructor(
    public navCtrl: NavController,
    public jMessage:JMessageUtil,
    public dialog:dialogUtil,
    public storage:storageService,
    public conService:contactsService) {
  }
  public requestList;

  /**
   * 同意添加
   * @param item
   */
  agreeAdd(item){
    let obj=this;
    this.dialog.showLoadingAlert("正在处理...",3000,()=>{
      obj.storage.read("nUserName").then(toUser=>{
        let param={
          fromUser:item.fromUser,
          toUser:toUser,
          isDeal:2,
          why:null,
          id:item.id
        };
        let body=JSON.stringify(param);
        obj.conService.dealFriendReq(body,result=>{
          if(result){
            obj.dialog.showAlert_callback("已同意",()=>{
              obj.requestList.splice(obj.requestList.indexOf(item), 1);
              obj.jMessage.addFriend(toUser,2,null).then(data=>{
                console.log(data);
              });
            });
          }
          else
            obj.dialog.showAlert("系统忙...请稍后再试");
        });
      })
    });
  }

  /**
   * 拒绝添加
   * @param item
   */
  refuseAdd(item){
    let obj=this;
    this.dialog.showPrompt("请注意","请输入拒绝理由","why",
      d1=>{},
      d2=>{
      let reason=null;
      if(d2.why!=""){
        reason=d2.why;
      }
        obj.dialog.showLoadingAlert("正在处理...",3000,()=>{
          obj.storage.read("nUserName").then(toUser=>{
            let param={
              fromUser:item.fromUser,
              toUser:toUser,
              isDeal:3,
              why:reason,
              id:item.id
            };
            let body=JSON.stringify(param);
            obj.conService.dealFriendReq(body,result=>{
              if(result)
              {
                obj.dialog.showAlert_callback("已拒绝",()=>{
                  obj.requestList.splice(obj.requestList.indexOf(item), 1);
                  obj.jMessage.addFriend(toUser,2,null).then(data=>{
                    console.log(data);
                  });
                });
              }
              else
                obj.dialog.showAlert("系统忙...请稍后再试");
            });
          })
        });
    });
  }

  toUserInfoPage(item){
    let obj=this;
    let param={
      username:item.fromUser
    };
    let body=JSON.stringify(param);
    this.conService.getFriendInfoDetail(body,result=>{
      console.log(result);
      obj.navCtrl.push(InfoDetail,{"actionType":"info",item:result})
    });

  }

  ngOnInit(){
    let obj=this;
    this.storage.read("nUserName").then(username=>{
      console.log(username);
      let params={
        toUser:username
      };
      let body=JSON.stringify(params);
      obj.conService.getReqList(body,result=>{
        console.log(result);
        //合并数组
        obj.requestList= result;
      })
    })

  }

}
