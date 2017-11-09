import { Component, OnInit } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  constructor() { }
  error_message = '';
  person = {
    email:'',
    password:''
  };
  ngOnInit() {
  }
  checkPerson (event){
    if(JSON.parse(localStorage.getItem(this.person.email))==null){
      this.error_message = 'Incorrect email';
      return false;
    }
    if(JSON.parse(localStorage.getItem(this.person.email)).password==this.person.password) {
      sessionStorage.clear();
      sessionStorage.setItem("email",this.person.email);
      this.error_message = '';
      location.href = '/timeTO';
      return;
    }
    this.error_message = 'Incorrect password';
    return false;
  }

}
