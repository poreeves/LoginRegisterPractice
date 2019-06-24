import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserProvider } from '../../providers/user/user'
import { HomePage } from '../home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private log: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _user: UserProvider,  private formBuilder: FormBuilder,
    private alertCrtl: AlertController) {
      this.log =this.formBuilder.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidLeave(){
    console.log("loggedIn", this._user.loggedIn)
    return this._user.getUserInfo().subscribe( res => {
      console.log('get user res', res)
      this._user.user['firstName'] = res['firstName'];
      this._user.user['lastName'] = res['lastName'];
      this._user.user['organization'] = res['organization'];
      this._user.user['picture'] = res['picture'];
    })
  }

  onLog(){
    this._user.user.email = this.log.value['email']
    this._user.user.password = this.log.value['password']
    return this._user.logUser().subscribe( res => {
      console.log('res', res)
      sessionStorage.setItem('token', res['token']);
      sessionStorage.setItem('userId', res['userId']);
      console.log("sess storage token", sessionStorage.getItem('token'))
      if(res = true){
        this.navCtrl.setRoot(HomePage);
        this._user.loggedIn = true;
      }
   }) 
  }


  forgotPass() {
    let alert = this.alertCrtl.create({ 
      title: 'Enter Email',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            console.log('submit clicked');
            }
          }
      ]
    });
    alert.present();
  }
}
