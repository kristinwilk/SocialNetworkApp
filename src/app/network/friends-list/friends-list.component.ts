import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person} from "../../classes";
import {MainServiceService} from "../../main-service.service";
import {literal} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  @ViewChild('search') searchField:ElementRef;
  constructor(private service: MainServiceService) { }
  @Input() person = new person();
  list;
  type;
  ngOnInit(){
    this.list = this.service.getAllFriends(this.person.Nickname);
    this.type = 'friend';
  }
  friends(){
    this.list = this.service.getAllFriends(this.person.Nickname);
    this.type = 'friend';
  }
  invites(){
    this.list = this.service.getAllInvites(this.person.Nickname);
    this.type = 'invite';
  }
  sentInvites(){
    this.list = this.service.getAllSentInvites(this.person.Nickname);
    this.type = 'sentInvite';
  }
  followers(){
    this.list = this.service.getFollowers(this.person.Nickname);
    this.type = 'follower';
  }
  Search(){
    this.list = null;
    this.type = 'search';
  }
  searchForList(){
    this.list = this.service.search(this.searchField.nativeElement.value,this.type,this.person.Nickname);
  }
}
