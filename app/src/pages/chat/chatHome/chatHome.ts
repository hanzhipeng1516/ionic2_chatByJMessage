import { Component} from '@angular/core';

import { NavController,ItemSliding  } from 'ionic-angular';

import {JMessageUtil} from "../../../service/JMessageUtil";
import {ChatViewPage} from "../chatView/chatView";
import {storageService} from "../../../service/storageService";
import {dialogUtil} from "../../../service/dialogUtil";

@Component({
  selector: 'page-chatHome',
  templateUrl: './chatHome.html'
})
export class ChatHomePage {
  conversations;
  allMsg;
  constructor(
    public navCtrl: NavController,
    public jMessage:JMessageUtil,
    public storage:storageService,
    public dialog:dialogUtil
  ) {

  }

  /**
   * 前往聊天页面
   */
  toChatView(item){
    item.needRead=0;
    //更新缓存列表
    let obj=this;
    obj.storage.read("nUserName").then(userName=>{
      obj.storage.write("conversations"+userName,JSON.stringify(obj.conversations))
    });
    this.navCtrl.push(ChatViewPage,{item:item});
  }

  /**
   * 下拉刷新
   * @param infiniteScroll
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    let obj=this;
    setTimeout(() => {
      obj.getConversation(()=>{});
      refresher.complete();
    }, 2000);
  }

  /**
   * 获得聊天列表
   */
  getConversation(fn){
    let obj=this;
    obj.jMessage.getConversation().then(data=>{
      console.log(data);
      if(data!=null){
        let arr=[];
        for(let idx in data){
          let arr1=[];
          //将聊天数据进行分类
          let nickname;
          console.log(obj.allMsg);
          if(obj.allMsg.length>0){
            for(let idx1 in obj.allMsg){
              //聊天信息分类
              if(data[idx].name==obj.allMsg[idx1].from_id){
                nickname=obj.allMsg[idx1].from_name;
                arr1.push(obj.allMsg[idx1]);
              }
              if(data[idx].name==obj.allMsg[idx1].target_id){
                nickname=obj.allMsg[idx1].target_name;
                arr1.push(obj.allMsg[idx1]);
              }
            };
            let createTime=new Date(arr1[arr1.length-1].create_time);
            let showTime=
              (createTime.getMonth()+1)+"-"+
              createTime.getDate()+" "+
              createTime.getHours()+":"+
              (createTime.getMinutes()<10?"0"+createTime.getMinutes() : createTime.getMinutes());
            let flag={
              name:data[idx].name,
              nickname:nickname,
              showMsg:arr1[arr1.length-1].content,//显示最后一条信息
              showTime:showTime,
              needRead:0,
              msgArr:arr1
            }
            arr.push(flag);
          }
        }
        console.log(arr);
        //保留未读的状态
        for(let idx1 in arr){
          for(let idx2 in obj.conversations){
            if(obj.conversations[idx2].name==arr[idx1].name){
              arr[idx1].needRead=obj.conversations[idx2].needRead;
            }
          }
        }
        obj.conversations=arr;
        fn();
        //存进缓存列表
        obj.storage.read("nUserName").then(userName=>{
          obj.storage.write("conversations"+userName,JSON.stringify(obj.conversations))
        });
      }else{
        obj.conversations=null;
        fn();
      }
    });
  }
  /**
   * 移除聊天栏目
   * @param obj
   */
  removeConversationItem(conItem){
    //移除元素
    this.conversations.splice(this.conversations.indexOf(conItem), 1);
    //更新缓存列表
    let obj=this;
    obj.storage.read("nUserName").then(userName=>{
      obj.storage.write("conversations"+userName,JSON.stringify(obj.conversations))
    });
  }

  /**
   * 标记内容已读
   * @param obj
   */
  flagIsReadConversationItem(slidingItem:ItemSliding,conItem){
    conItem.needRead=0;
    //更新缓存列表
    let obj=this;
    obj.storage.read("nUserName").then(userName=>{
      obj.storage.write("conversations"+userName,JSON.stringify(obj.conversations))
    });
    //关闭侧滑栏
    slidingItem.close();
  }

  /**
   * 读取缓存的列表
   */
  storageConversationList(){
    let obj=this;
    obj.storage.read("nUserName").then(userName=>{
      obj.storage.read("conversations"+userName).then(data=>{
        if(data!=null){
          obj.conversations=JSON.parse(JSON.parse(data));
        }else{
          obj.getConversation(()=>{});
        }
      })
    });
  }

  //初始化
  ngOnInit() {
    this.loadMsgReport();//加载数据
    this.storageConversationList();//加载会话列表(读取缓存)
    this.onMsgReceive(); //消息监听
  }

  /**
   * 读取聊天记录
   */
  loadMsgReport(){
    let obj=this;
    //将所有的聊天记录存储
    obj.storage.read("nUserName").then(nUserName=>{
      obj.storage.read("msgList_"+nUserName).then(listStr=>{
        //有数据，需进行处理
        if(listStr!=null){
          let arr1=JSON.parse(JSON.parse(listStr));
          obj.allMsg=arr1;//所有的聊天数据
        }else{
          obj.allMsg=[];//所有的聊天数据
        }
      });
    });
  }

  //监听信息推送
  onMsgReceive(){
    let obj=this;
    obj.jMessage.onMsgReceive().then(data=>{
      console.log(data);
      // NativeAudio.preloadSimple('uniqueId1', 'assets/audio/6178.mp3').then(()=>{
      //   obj.dialog.showAlert("success init");
      //   NativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing')).then(()=>{
      //     obj.dialog.showAlert("success play");
      //   }, ()=>{
      //     obj.dialog.showAlert("error play")});
      //   NativeAudio.stop('uniqueId1').then(()=>{
      //     obj.dialog.showAlert("success stop");}, ()=>{
      //     obj.dialog.showAlert("error stop");
      //   });
      // }, ()=>{
      //   obj.dialog.showAlert("error init");
      // });

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
          //有数据，需进行处理
          if(listStr!=null){
            let arr1=JSON.parse(JSON.parse(listStr));
            let arr2=arr1.concat(msgArray);
            obj.allMsg=[];
            obj.allMsg=arr2;//所有的聊天数据
            obj.storage.write("msgList_"+nUserName,JSON.stringify(arr2));
            console.log("缓存成功");
            //刷新会话列表
            obj.getConversation(()=>{
              for(let idx in obj.conversations){
                let needRead=obj.conversations[idx].needRead;
                for(let idx2 in msgArray){
                  if(obj.conversations[idx].name==msgArray[idx2].from_id){
                    //说明该用户发来信息
                    needRead+=1;
                  }
                }
                obj.conversations[idx].needRead=needRead;
                ///置顶对应列--先移除后添加
                let topObj=obj.conversations[idx];
                obj.conversations.splice(obj.conversations.indexOf(topObj), 1);
                obj.conversations.splice(0, 0,topObj);
              }
              console.log(obj.conversations);
            });

          }else{
            //存储数据
            obj.storage.write("msgList_"+nUserName,JSON.stringify(msgArray));
            console.log("缓存成功");
            obj.allMsg=[];
            obj.allMsg=msgArray;//所有的聊天数据
            //刷新会话列表
            obj.getConversation(()=>{
              //置顶对应列
              for(let idx in obj.conversations){
                let needRead=obj.conversations[idx].needRead;
                for(let idx2 in msgArray){
                  if(obj.conversations[idx].name==msgArray[idx2].from_id){
                    //说明该用户发来信息
                    needRead+=1;
                  }
                }
                obj.conversations[idx].needRead=needRead;
              }
              console.log(obj.conversations);
            });
          }
        });
      });
      //消息处理
      obj.onMsgReceive();
    })
  }

}
