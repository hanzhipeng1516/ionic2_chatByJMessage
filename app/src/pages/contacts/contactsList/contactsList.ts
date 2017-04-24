import { Component } from '@angular/core';
import {JMessageUtil} from "../../../service/JMessageUtil";

import { NavController } from 'ionic-angular';
import {SearchFriend} from "../searchFriend/searchFriend";
import {ContactsMsg} from "../contactMsg/contactMsg";
import {InfoDetail} from "../infoDetail/infoDetail";
import {contactsService} from "../../../service/contactsService";
import {storageService} from "../../../service/storageService";

@Component({
  selector: 'page-contactsList',
  templateUrl: './contactsList.html'
})
export class ContactsList {
  items;
  badgeNum:number=0;
  constructor(
    public navCtrl: NavController,
    public jMessage:JMessageUtil,
    public conService:contactsService,
    public storage:storageService) {

  }
  //只要进入页面就执行
  ionViewDidEnter(){
    let obj=this;
    //初始化需要处理的请求
    this.storage.read("nUserName").then(toUser=>{
      let params={
        toUser:toUser,
      };
      let body=JSON.stringify(params);
      obj.conService.needDealReqCount(body,result=>{
        obj.badgeNum=result.needNum;
      })
    })
  }

  ngOnInit() {
    //初始化联系人
    this.initializeItems();
  }

  /**
   * 添加好友页面
   */
  toSearchFriendPage(){
    this.navCtrl.push(SearchFriend);
  }

  /**
   * 到处理请求信息页面
   */
  toContactMsgPage(){
    this.navCtrl.push(ContactsMsg);
  }

  /**
   * 去页面详情
   * @param item
   */
  toInfoDetailPage(item){
    this.navCtrl.push(InfoDetail,{'item':item,'actionType':'detailInfo'})
  }

  /**
   * 初始化列表
   */
  initializeItems() {
    let obj=this;
    this.jMessage.getFriendList().then(data=>{
      console.log(data);
      obj.items=data;
    });
  }

  /**
   * 条件搜索好友
   * @param ev
   */
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      // Reset items back to all of the items
      this.initializeItems();
    }
  }

}
