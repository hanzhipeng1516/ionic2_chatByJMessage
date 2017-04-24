import { Injectable } from '@angular/core';

import {netService} from "./netService";
import {BASE64} from "./base64";
import {storageService} from "./storageService";

@Injectable()
export class contactsService{
  // private getContactsLike:string="http://localhost:3000/contacts/getContactsLike";
  // private selectFriendRequest:string="http://localhost:3000/contacts/selectFriendRequest";
  // private selectFriendRequestCount:string="http://localhost:3000/contacts/selectFriendRequestCount";
  // private addFriendRequest:string="http://localhost:3000/contacts/addFriendRequest";
  // private DealFriendRequest:string="http://localhost:3000/contacts/DealFriendRequest";
  // private getFriendInfo:string="http://localhost:3000/contacts/getFriendInfo";

  private getContactsLike:string="http://www.hzp1516.cn:3000/contacts/getContactsLike";
  private selectFriendRequest:string="http:///www.hzp1516.cn:3000/contacts/selectFriendRequest";
  private selectFriendRequestCount:string="http:///www.hzp1516.cn:3000/contacts/selectFriendRequestCount";
  private addFriendRequest:string="http:///www.hzp1516.cn:3000/contacts/addFriendRequest";
  private DealFriendRequest:string="http:///www.hzp1516.cn:3000/contacts/DealFriendRequest";
  private getFriendInfo:string="http:///www.hzp1516.cn:3000/contacts/getFriendInfo";


  constructor(
    public net:netService,
    public base64:BASE64,
    private storage:storageService,
  ){

  }

  /**
   * 搜索好友
   * @param param
   * @param callback
   */
  searchFriend(param,callback){
    this.net.httpPost(this.getContactsLike,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 获取请求列表
   * @param param
   * @param callback
   */
  getReqList(param,callback){
    this.net.httpPost(this.selectFriendRequest,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 发送好友申请请求
   * @param param
   * @param callback
   */
  addFriendReq(param,callback){
    this.net.httpPost(this.addFriendRequest,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 需要处理的请求条数
   * @param param
   * @param callback
   */
  needDealReqCount(param,callback){
    this.net.httpPost(this.selectFriendRequestCount,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 处理好友请求
   * @param param
   * @param callback
   */
  dealFriendReq(param,callback){
    this.net.httpPost(this.DealFriendRequest,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    });
  }

  /**
   * 获得好友信息
   * @param param
   * @param callback
   */
  getFriendInfoDetail(param,callback){
    this.net.httpPost(this.getFriendInfo,param).then(data=>{
      let resultObj=JSON.parse(this.base64.base64decode(data._body)).data;
      callback(resultObj);
    })
  }

}
