import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainServiceService} from "../main-service.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  constructor(private route : ActivatedRoute,private service: MainServiceService) {
  }
  person;
  ngOnInit():void {
    this.route.params.subscribe(params =>{
      this.person = this.service.getPerson(params['Nickname']);
    })
  }


}
