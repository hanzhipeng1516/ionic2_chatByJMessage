import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {BusPage} from "../bus/bus";
import {ConstellationPage} from "../constellation/constellation";
import {FilePage} from "../file/file";
import {MapPage} from "../map/map";
import {NBAPage} from "../nba/nba";
import {NewsPage} from "../news/news";
import {RobotPage} from "../robot/robot";
import {SoccerPage} from "../soccer/soccer";
import {WeatherPage} from "../weather/weather";

@Component({
  selector: 'page-fnHome',
  templateUrl: './fnHome.html'
})
export class fnHome{
  constructor(
    public navCtrl:NavController
  ){

  }
  //公交路线
  toBusPage(){
    this.navCtrl.push(BusPage);
  }
  //星座
  toConstellationPage(){
    this.navCtrl.push(ConstellationPage);
  }
  //看电影
  toFilePage(){
    this.navCtrl.push(FilePage);
  }
  //地图
  toMapPage(){
    this.navCtrl.push(MapPage);
  }
  //NBA赛讯
  toNBAPage(){
    this.navCtrl.push(NBAPage);
  }
  //新闻
  toNewsPage(){
    this.navCtrl.push(NewsPage);
  }
  //ST机器人
  toRobotPage(){
    this.navCtrl.push(RobotPage);
  }
  //足球联赛赛讯
  toSoccerPage(){
    this.navCtrl.push(SoccerPage);
  }
  //天气预报
  toWeatherPage(){
    this.navCtrl.push(WeatherPage);
  }
}
