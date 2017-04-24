import {Component} from "@angular/core";
import {NavController } from "ionic-angular";

@Component({
  selector:"page-map",
  templateUrl:"./map.html"
})
export class MapPage{
  constructor(
    private navCtrl:NavController,
  ){

  }
}
