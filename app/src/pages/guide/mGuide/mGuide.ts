import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {storageService} from "../../../service/storageService";
import {LoginPage} from "../../account/login/login";

@Component({
  selector: 'page-mGuide',
  templateUrl: 'mGuide.html'
})

export class mGuidePage {
  constructor(
    public navCtrl: NavController,
    public storage:storageService) {

  }

  toLoginPage(){
    this.storage.write("firstIn",true);
    this.navCtrl.setRoot(LoginPage);
  }

}
