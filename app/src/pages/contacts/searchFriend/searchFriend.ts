import { Component } from '@angular/core';
import {JMessageUtil} from "../../../service/JMessageUtil";

import { NavController } from 'ionic-angular';
import {storageService} from "../../../service/storageService";
import {contactsService} from "../../../service/contactsService";
import {InfoDetail} from "../infoDetail/infoDetail";

@Component({
  selector: 'page-searchFriend',
  templateUrl: './searchFriend.html'
})
export class SearchFriend {
  constructor(
    public navCtrl: NavController,
    public jMessage:JMessageUtil,
    public storage:storageService,
    public conService:contactsService
    ) {
  }
  friendList=[];

  /**
   * 搜索好友
   * @param ev
   */
  searchFriendList(ev:any){
    let obj=this;
    let val = ev.target.value;
    console.log(val);
    this.storage.read("nUserName").then(data=>{
      let body=JSON.stringify({
        "username":data,
        "pointWord":val
      });
      obj.conService.searchFriend(body,result=>{
        obj.friendList=[];
        obj.friendList= obj.friendList.concat(result);
        console.log(result);
      })
    });
  }

  /**
   * 前往详情页面
   */
  toRequestPage(obj){
    console.log(obj);
    this.navCtrl.push(InfoDetail,{"item":obj,"actionType":"request"});
  }

}
