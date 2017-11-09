import {Component, OnInit, ViewChild} from '@angular/core';
import {TextInfoComponent} from "./text-info/text-info.component";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  @ViewChild(TextInfoComponent) textInfo : TextInfoComponent;
  isEditing = 'Edit';
  constructor() { }

  person = {
    Name:'',
    Surname:'',
    Nickname:'',
    email:'',
    password:''
  };
  ngOnInit() {
    this.person = JSON.parse(localStorage.getItem(sessionStorage.getItem("email")));
  }
  edit(){
    if(this.isEditing=='Edit'){
      this.isEditing = 'Ok';
      this.textInfo.edit();
    }
    else{
      this.isEditing = 'Edit';
      this.textInfo.endOfEdit();
    }
  }
}
