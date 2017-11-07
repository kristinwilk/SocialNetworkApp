import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  person = {
    Name:'',
    Surname:'',
    Nickname:'',
    email:'',
    password:''
  };
  constructor() { }

  ngOnInit() {
  }
  add_person(Name,Surname,Nickname,email,password){
    localStorage.setItem("Name",Name);
    localStorage.setItem("Surname",Surname);
    localStorage.setItem("Nickname",Nickname);
    localStorage.setItem("Email",email);
    localStorage.setItem("Password",password);
  }
}
