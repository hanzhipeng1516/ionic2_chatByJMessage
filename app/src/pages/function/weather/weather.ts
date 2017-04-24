import {Component} from "@angular/core";
import {NavController } from "ionic-angular";

@Component({
  selector:"page-weather",
  templateUrl:"./weather.html"
})
export class WeatherPage{
  constructor(
    private navCtrl:NavController,
  ){

  }
}
