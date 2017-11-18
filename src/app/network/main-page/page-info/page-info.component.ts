import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TextInfoComponent} from "./text-info/text-info.component";
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  @ViewChild(TextInfoComponent) textInfo : TextInfoComponent;
  isEditing = 'Edit';
  constructor(private service: MainServiceService) { }
  @Input() person = new person();
  ngOnInit() {
    if(!this.service.isAuthPerson(this.person.Nickname)){
      document.getElementById('Edit').style.display = 'none';
      document.getElementById('invite').style.display = 'inline-block';
      document.getElementById('message').style.display = 'inline-block';
    }
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
