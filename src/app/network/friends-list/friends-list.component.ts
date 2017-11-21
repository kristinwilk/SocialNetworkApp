import {Component, Input, OnInit} from '@angular/core';
import {person} from "../../classes";
import {MainServiceService} from "../../main-service.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private service: MainServiceService) { }
  @Input() person = new person();

  ngOnInit() {

  }

}
