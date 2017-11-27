import { Component, OnInit } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import {person} from "../../classes";
import {MainServiceService} from "../../main-service.service";
import {debug} from "util";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {

  constructor(private service : MainServiceService) { }
  error_message = '';
  person = new person();
  checkPerson (){
    event.preventDefault();
    if(this.service.checkNickname(this.person)){
      this.error_message = 'Incorrect nickname';
      return false;
    }
    if(!this.service.checkPassword(this.person)) {
      this.error_message = 'Incorrect password';
    }
  }

}
