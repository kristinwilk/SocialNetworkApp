import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service: MainServiceService) { }

  ngOnInit() {
  }
  out(){
    this.service.out();
  }
}
