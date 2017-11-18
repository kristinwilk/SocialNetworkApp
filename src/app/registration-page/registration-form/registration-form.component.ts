import { Component, OnInit } from '@angular/core';
import {person} from "../../classes";
import {MainServiceService} from "../../main-service.service";
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  person = new person();
  error_message;
  constructor(private service: MainServiceService) {}

  ngOnInit() {
    this.person.Name = '';
    this.person.Nickname = '';
    this.person.Surname = '';
    this.person.email = '';
    this.person.password = '';
  }
  add_person(){
    event.preventDefault();
    this.error_message = this.service.add_person(this.person);
  }
}
