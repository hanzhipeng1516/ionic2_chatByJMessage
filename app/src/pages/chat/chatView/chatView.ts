import { Component,ViewChild } from '@angular/core';

import {NavController, NavParams,Content,Navbar} from 'ionic-angular';
import {JMessageUtil} from "../../../service/JMessageUtil";
import {InfoDetail} from "../../contacts/infoDetail/infoDetail";
import {storageService} from "../../../service/storageService";
import {userService} from "../../../service/userService";

@Component({
  selector: 'page-chatView',
  templateUrl: './chatView.html'
})
export class ChatViewPage {
  @ViewChild(Content) content: Content;
  @ViewChild(Content) navBar: Navbar;
  toUserNickName;
  toUser;
  mUser;
  contentText;
  msgList;
  constructor(
    public navCtrl: NavController,
    public jMessage:JMessageUtil,
    public param:NavParams,
    public storage:storageService,
    public userService:userService
  ) {

  }

  //只要进入页面就执行
  ionViewDidEnter(){
    let obj=this;
    let msgs=this.param.get("item");
    if(msgs!=null){
      //从聊天列表进入
      this.toUser=msgs.name;
      this.toUserNickName=msgs.nickname;
    }else{
      //从通讯录进入
      this.toUser=this.param.get("username");
      this.toUserNickName=this.param.get("nickname");
    }
    obj.storage.read("nUserName").then(nUserName=>{
      //读取聊天记录
      obj.storage.read("msgList_"+nUserName).then(listStr=>{
        obj.userService.getUserInfo(userInfo=>{
          //有数据，需进行处理
          if(listStr!=null){
            let arr1=JSON.parse(JSON.parse(listStr));
            let msgInfos=[];
            for(let idx1 in arr1){
              //聊天信息提取
              if(obj.toUser==arr1[idx1].from_id&&userInfo.username==arr1[idx1].target_id){
                arr1[idx1].viewLocation=0;
                msgInfos.push(arr1[idx1]);
              }
              if(userInfo.username==arr1[idx1].from_id&&obj.toUser==arr1[idx1].target_id){
                arr1[idx1].viewLocation=1;
                msgInfos.push(arr1[idx1]);
              }
            };
            obj.msgList=msgInfos;
            //滑到屏幕最底部
            obj.content.scrollTo(0,obj.content.scrollHeight+obj.navBar.height(),1000).then(()=>{});
          }else{
            obj.msgList=null;
          }
        })
      });
    });
  }

  //监听信息推送
  onMsgReceive(){
    let obj=this;
      obj.jMessage.onMsgReceive().then(data=>{
        console.log(data);
        let msgArray=[];
        for(let o in data){
          let msg=data[o].content;
          let msgPojo={
            create_time:msg.create_time,
            from_id:msg.from_id,
            from_name:msg.from_name,
            content:msg.msg_body.text,
            target_id:msg.target_id,
            target_name:msg.target_name,
          };
          msgArray.push(msgPojo);
        }
        //将所有的聊天记录存储
        obj.storage.read("nUserName").then(nUserName=>{
          obj.storage.read("msgList_"+nUserName).then(listStr=>{
            obj.userService.getUserInfo(userInfo=>{
              //有数据，需进行处理
              if(listStr!=null){
                for(let idx1 in msgArray){
                  //聊天信息提取
                  if(obj.toUser==msgArray[idx1].from_id&&userInfo.username==msgArray[idx1].target_id){
                    msgArray[idx1].viewLocation=0;
                    obj.msgList.push(msgArray[idx1]);
                  }
                  if(userInfo.username==msgArray[idx1].from_id&&obj.toUser==msgArray[idx1].target_id){
                    msgArray[idx1].viewLocation=1;
                    obj.msgList.push(msgArray[idx1]);
                  }
                };
              }else{
                for(let idx1 in msgArray){
                  //聊天信息提取
                  if(obj.toUser==msgArray[idx1].from_id&&userInfo.username==msgArray[idx1].target_id){
                    msgArray[idx1].viewLocation=0;
                    obj.msgList.push(msgArray[idx1]);
                  }
                  if(userInfo.username==msgArray[idx1].from_id&&obj.toUser==msgArray[idx1].target_id){
                    msgArray[idx1].viewLocation=1;
                    obj.msgList.push(msgArray[idx1]);
                  }
                };
              }
            })
          });
        });
        //消息处理
        obj.onMsgReceive();
      })
  }

  /**
   * 发送文本消息
   */
  toSendMsg(){
    let obj=this;
    let nickname;
    if(this.toUserNickName==null||this.toUserNickName=="")
      nickname="";
    this.jMessage.sendSingleMsg(this.toUser,nickname,this.contentText).then(data=>{
      if(data==0){
        obj.userService.getUserInfo(userObj=>{
          obj.storage.read("nUserName").then(nUserName=>{
            //读取消息信息
            obj.storage.read("msgList_"+nUserName).then(listStr=>{
              //有数据，需进行处理
              if(listStr!=null){
                let arr1=JSON.parse(JSON.parse(listStr));
                //发送的消息进行缓存
                let msgPojo={
                  create_time:new Date().getTime(),
                  from_id:userObj.username,
                  from_name:userObj.nickname,
                  content:obj.contentText,
                  target_id:obj.toUser,
                  target_name:obj.toUserNickName,
                  viewLocation:1
                };
                arr1.push(msgPojo);
                obj.msgList.push(msgPojo);
                obj.storage.write("msgList_"+nUserName,JSON.stringify(arr1));
                obj.contentText="";
                //滑到屏幕最底部
                obj.content.scrollTo(0,obj.content.scrollHeight+obj.navBar.height(),1000).then(()=>{});
              }else{
                let arr1=[];
                //发送的消息进行缓存
                let msgPojo={
                  create_time:new Date().getTime(),
                  from_id:userObj.username,
                  from_name:userObj.nickname,
                  content:obj.contentText,
                  target_id:obj.toUser,
                  target_name:obj.toUserNickName,
                  viewLocation:1
                };
                arr1.push(msgPojo);
                obj.msgList.push(msgPojo);
                obj.storage.write("msgList_"+nUserName,JSON.stringify(arr1));
                obj.contentText="";
                //滑到屏幕最底部
                obj.content.scrollTo(0,obj.content.scrollHeight+obj.navBar.height(),1000).then(()=>{});
              }
            });
          });
        });
      }else{
        console.log("发送失败");
      }
    });
  }

  //初始化
  ngOnInit() {
    //实时监听
    this.onMsgReceive();
    //存储发送人信息
    this.storage.read("nUserName").then(mUser=>{
      this.mUser=mUser;
    })
  }

}
