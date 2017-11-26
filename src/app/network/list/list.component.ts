import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";
import {person} from "../../classes";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service: MainServiceService) { }
  person = new person();
  CountMessages;
  CountInvites;
  ngOnInit() {
    this.person = this.service.getMainPerson();
    setInterval(()=>{
      this.CountMessages = this.service.getCountOfNewMessages();
      this.CountInvites = this.service.getCountOfInvites();
      if(this.CountMessages==0)
        this.CountMessages = '';
      if(this.CountInvites==0)
        this.CountInvites = '';
    },1);
  }
  out(){
    this.service.out();
  }
}
