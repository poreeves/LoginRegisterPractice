import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserProvider } from '../../providers/user/user'
import { HomePage } from '../home/home'

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  private reg: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _user: UserProvider, private formBuilder: FormBuilder) {
      this.reg = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
        confirmPassword: ['',Validators.required],
        picture: [''],
        organization: ['']
      })
  }

  onRegister(){
    if(this.reg.value['password'] != this.reg.value['confirmPassword']){
      console.log("password does not match")
    } else{
        this._user.user.firstName = this.reg.value['firstName']
        this._user.user.lastName = this.reg.value['lastName']
        this._user.user.email = this.reg.value['email']
        this._user.user.password = this.reg.value['password']
        this._user.user.organization = this.reg.value['organization']
        this._user.user.picture = this.reg.value['picture']
        console.log("register work")
        console.log("user.user", this._user.user)
        console.log("regForm.value", this.reg.value)
        
        return this._user.postUser().subscribe( res => {
            sessionStorage.setItem('token', res['token']);
            sessionStorage.setItem('userId', res['userId']);
            console.log("post res", res)
            if(res = true){
              this.navCtrl.setRoot(HomePage);
              this._user.loggedIn = true;
            }
          // }
        })
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

}
