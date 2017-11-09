import { Component, OnInit } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  private localStorageService = LocalStorageService;
  public person = {
    Name:'',
    Surname:'',
    Nickname:'',
    email:'',
    password:''
  };
  constructor() {}

  ngOnInit() {
  }
  add_person(){
    sessionStorage.clear();
    sessionStorage.setItem("Nickname",this.person.email);
    localStorage.setItem(this.person.email,JSON.stringify(this.person));
    location.href = '/timeTO';
  }
}
