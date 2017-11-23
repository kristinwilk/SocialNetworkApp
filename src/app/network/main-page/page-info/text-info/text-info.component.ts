import {Component, Input, OnInit} from '@angular/core';
import {MainServiceService} from "../../../../main-service.service";
import {info, person} from "../../../../classes";

@Component({
  selector: 'app-text-info',
  templateUrl: './text-info.component.html',
  styleUrls: ['./text-info.component.scss']
})
export class TextInfoComponent implements OnInit {

  info = new info();
  constructor(private service : MainServiceService) { }
  disabled = true;
  @Input() person = new person();
  ngOnInit() {
    let info =  this.service.getInfo(this.person.Nickname);
    if(info!=null)
      this.info = info;
  }

  check(event) {

    if (event.ctrlKey || event.altKey || event.metaKey) return;

    if (event.keyCode< '0' || event.keyCode > '9') {
      return false;
    }
  }
  public edit(){
   this.disabled = false;
  }
  public endOfEdit(){
    this.service.changeInfo(JSON.stringify(this.info));
    this.disabled = true;
  }

}
