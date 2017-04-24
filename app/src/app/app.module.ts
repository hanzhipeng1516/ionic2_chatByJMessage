import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from  '../pages/account/login/login'
import {RegPage} from "../pages/account/reg/reg";
import {BASE64}from '../service/base64'
import {netService} from "../service/netService";
import {storageService} from "../service/storageService";
import {userService} from "../service/userService";
import {dialogUtil} from "../service/dialogUtil";
import {validUtil} from "../service/validUtil";
import {GuidePage} from "../pages/guide/guide/guide";
import {mGuidePage} from "../pages/guide/mGuide/mGuide";
import {SQLiteService}from "../service/SQLiteService"
//
import {ChatHomePage} from "../pages/chat/chatHome/chatHome";
import {ContactsList} from "../pages/contacts/contactsList/contactsList";
import {fnHome} from "../pages/function/fnHome/fnHome";
import {accountHome} from "../pages/account/accountHome/accountHome";
import {JMessageUtil} from "../service/JMessageUtil";
import {ChatViewPage} from "../pages/chat/chatView/chatView";
import {ContactsMsg} from "../pages/contacts/contactMsg/contactMsg";
import {InfoDetail} from "../pages/contacts/infoDetail/infoDetail";
import {SearchFriend} from "../pages/contacts/searchFriend/searchFriend";
import {MyInfoPage} from "../pages/account/myinfo/myInfo";
import {BusPage} from "../pages/function/bus/bus";
import {ConstellationPage} from "../pages/function/constellation/constellation";
import {FilePage} from "../pages/function/file/file";
import {MapPage} from "../pages/function/map/map";
import {NBAPage} from "../pages/function/nba/nba";
import {NewsPage} from "../pages/function/news/news";
import {RobotPage} from "../pages/function/robot/robot";
import {SoccerPage} from "../pages/function/soccer/soccer";
import {WeatherPage} from "../pages/function/weather/weather";
import {contactsService} from "../service/contactsService";

@NgModule({
  declarations: [
    MyApp,//根app
    TabsPage,//tab父组件
    LoginPage,//登录
    RegPage,//注册
    GuidePage,//引导页1
    mGuidePage,//引导页2
    //
    ChatHomePage,//聊天列表
    ChatViewPage,//聊天界面
    //
    ContactsList,//联系人列表
    ContactsMsg,//好友请求处理
    InfoDetail,//好友详细信息
    SearchFriend,//寻找好友
    //
    fnHome,//精彩功能列表
    BusPage,//公交路线
    ConstellationPage,//星座
    FilePage,//看电影
    MapPage,//地图
    NBAPage,//NBA赛讯
    NewsPage,//新闻
    RobotPage,//ST机器人
    SoccerPage,//足球联赛赛讯
    WeatherPage,//天气预报
    //
    accountHome,//我的
    MyInfoPage//我的信息修改
  ],
  imports: [
    //设置样式
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      tabsHideOnSubPages:true,
      pageTransition: 'ios'
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,//根app
    TabsPage,//tab父组件
    LoginPage,//登录
    RegPage,//注册
    GuidePage,//引导页1
    mGuidePage,//引导页2
    //
    ChatHomePage,//聊天列表
    ChatViewPage,//聊天界面
    //
    ContactsList,//联系人列表
    ContactsMsg,//好友请求处理
    InfoDetail,//好友详细信息
    SearchFriend,//寻找好友
    //
    fnHome,//精彩功能列表
    BusPage,//公交路线
    ConstellationPage,//星座
    FilePage,//看电影
    MapPage,//地图
    NBAPage,//NBA赛讯
    NewsPage,//新闻
    RobotPage,//ST机器人
    SoccerPage,//足球联赛赛讯
    WeatherPage,//天气预报
    //
    accountHome,//我的
    MyInfoPage//我的信息修改
  ],
  //提供商
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //
    userService,
    contactsService,
    //
    netService,
    storageService,
    SQLiteService,
    JMessageUtil,
    //
    BASE64,
    dialogUtil,
    validUtil,

  ]
})
export class AppModule {}
