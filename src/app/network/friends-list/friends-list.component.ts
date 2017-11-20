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
    if(!this.service.isAuthPerson(this.person.Nickname)) {
      document.getElementById('Search').style.display = 'none';
      document.getElementById('Invites').style.display = 'none';
      document.getElementById('Sent invites').style.display = 'none';
    }
  }

}
