import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,  public _user: UserProvider) {

  }
  ionViewDidEnter() {
    console.log('user info on enter', this._user.user);
  }
}
