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
  ngOnInit() {
    this.person = this.service.getMainPerson();
  }
  out(){
    this.service.out();
  }
}
