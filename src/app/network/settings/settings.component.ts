import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";
import set = Reflect.set;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  first = "All";
  second = "All";
  third = "All";
  ngOnInit() {
    if(this.service.getSettings()!=null){
      let settings = this.service.getSettings();
      console.log(settings[0]);
      document.getElementById(settings[0]).click();
      document.getElementById(settings[1]+'1').click();
      document.getElementById(settings[2]+'2').click();
      this.first = settings[0];
      this.second = settings[1];
      this.third = settings[2];
    }
  }
  changeSettings(){
    let settings = [];
    settings = settings.concat(this.first);
    settings = settings.concat(this.second);
    settings = settings.concat(this.third);
    this.service.setSettings(settings);
  }
  deleteAccount(){
    let isTrue = confirm("Are you sure?");
    if(isTrue){
      this.service.deleteAccount();
      this.service.out();
      location.replace('/signIn');
    }
  }
  setFirst(String){
    this.first = String;
  }
  setSecond(String){
    this.second = String;
  }
  setThird(String){
    this.third = String;
  }

}
