import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserProvider } from '../../providers/user/user'
import { LoginPage } from '../login/login'
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  private account: FormGroup;
  private password: FormGroup;
  editClicked: boolean = false;
  passClicked: boolean = false;
  defaultPhoto: string = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
  accountPhoto: string = "https://images.pexels.com/photos/1526403/pexels-photo-1526403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public _user: UserProvider, private formBuilder: FormBuilder, private alertCrtl: AlertController) {
      this.account = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',Validators.required],
        organization: ['']
      })

      this.password = this.formBuilder.group({
        email: ['',Validators.required],
        oldPassword: ['',Validators.required],
        newPassword: ['',Validators.required],
        confirmNewPassword: ['',Validators.required]
      })
  }

  toLogIn(){
    this.navCtrl.setRoot(LoginPage)
  }
 
  editClick(){ 
      console.log("was clicked")
      this.editClicked = true
  }
  editHide(){
      console.log("was clicked")
        this.editClicked = false
        console.log("hide", this.editClicked)
  }
  passClick(){ 
    console.log("pass was clicked")
    this.passClicked = true
  }
  passHide(){
    console.log("pass hide was clicked")
      this.passClicked = false
      console.log("pass hide", this.passClicked)
  }

  onChangePass(){
    if(this.password.value['newPassword'] = this.password.value['confirmNewPassword']){
      // this._user.password = new FormData
      // this._user.password.append('old password', this.password.value['oldPassword'])
      // this._user.password.append('new password', this.password.value['newPassword'])
      // this._user.password['email'] = this._user.user.email
      this._user.password['oldPassword'] = this.password.value['oldPassword'];
      this._user.password['newPassword'] = this.password.value['newPassword'];
      console.log("password form", this.password.value)  
      console.log("this._user.password after", this._user.password)
      return this._user.changePass().subscribe( res => {
      console.log("change pass res", res)
      if(res = true){
        console.log("password change succesful")
      }
    })
    }else{
      console.log("passwords do not match")
    }
    
  }

  onEdit(){
    if(this.account.value['firstName']){
      console.log("edit first");
      this._user.user['firstName'] = this.account.value['firstName']
    }
    if(this.account.value['lastName']){
      console.log("edit last");
      this._user.user['lastName'] = this.account.value['lastName']
    }
    if(this.account.value['email']){
      console.log("edit email");
      this._user.user['email'] = this.account.value['email']
    }
    if(this.account.value['organization']){
      console.log("edit organization");
      this._user.user['organization'] = this.account.value['organization']
    }
    console.log("onEdit work")
    console.log("user.user edited", this._user.user)
    console.log("accForm.value", this.account.value)
    this.account.reset()
    return this._user.changeInfo().subscribe( res => {
        console.log("change res", res)
    })
  }

  presentPrompt() {
    let alert = this.alertCrtl.create({
      title: 'Update Photo',
      inputs: [
        {
          name: 'photoUrl',
          placeholder: 'Photo Url'
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
          text: 'Update',
          handler: data => {
            console.log('update clicked', data.photoUrl )
            this._user.user.picture = data.photoUrl
            console.log("photo change url", this._user.user.picture)
            this.onEdit();
            console.log(" after onEdit user.user edited", this._user.user)
          }
        }
      ]
    });
    alert.present();
  }

  onResetPass(){
    return this._user.resetPass().subscribe( res =>{
      console.log("reset pass res", res)
    })
  }

  ionViewDidLoad() {
    console.log(this._user)
    console.log('ionViewDidLoad AccountPage');
  }

}
