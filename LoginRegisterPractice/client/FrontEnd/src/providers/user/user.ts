import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registration';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  postUrl: string = "http://localhost:3000/api/appUsers/"
  logUrl: string = "http://localhost:3000/api/appUsers/login"
  user = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "picture": "",
    "organization": ""
  }
  password = {}
  resetPassObject: {
    'newPassword': 'user7'
  }
  editUser = {}
  loggedIn: boolean = false

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  postUser(){
    console.log("post ran")
    return this.http.post(this.postUrl, this.user)
  }
 
  logUser(){
    return this.http.post(this.logUrl, this.user)
  }

  logOutUser(){
    return this.http.post(this.postUrl + 'logout?access_token=' + sessionStorage.getItem('token'), {})
  }
  onLogOut(){
    return this.logOutUser().subscribe( res =>{
      console.log("logout res ", res)
      if(res = true){
        this.loggedIn = false;
        sessionStorage.clear()
        this.user = {"firstName": "","lastName": "","email": "","password": "","picture": "","organization": ""}
        console.log("logout", res, this.loggedIn)
      } else{
        console.log("logout failed")
      }
    })
  }

  getUserInfo(){
    return this.http.get(this.postUrl + sessionStorage.getItem('userId') + '?access_token=' + sessionStorage.getItem('token'))
  }

 changeInfo(){
   return this.http.post(this.postUrl + sessionStorage.getItem('userId') +'/replace?access_token=' + sessionStorage.getItem('token') , this.user )
 } 

 changePass(){
   return this.http.post(this.postUrl + 'change-password?access_token=' + sessionStorage.getItem('token'), this.password)
 }
 resetPass(){
  return this.http.post(this.postUrl + 'change-password?access_token=' + sessionStorage.getItem('token'), JSON.stringify(this.resetPassObject))
}
}
