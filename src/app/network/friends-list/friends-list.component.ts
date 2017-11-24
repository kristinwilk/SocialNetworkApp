import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person} from "../../classes";
import {MainServiceService} from "../../main-service.service";
import {literal} from "@angular/compiler/src/output/output_ast";
import {Observable} from "rxjs/Observable";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {type} from "os";

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
    this.type = 'friend';
    setInterval(()=>{    //<<<---    using ()=> syntax
      this.list = this.service.search(this.searchField.nativeElement.value,this.type,this.person.Nickname);
      if(this.list!=null) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i] = [this.list[i], this.type];
        }
      }
    },100);
  }
  friends(){
    this.type = 'friend';
  }
  invites(){
    this.type = 'invite';
  }
  sentInvites(){
    this.type = 'sentInvite';
  }
  followers(){
    this.type = 'follower';
  }
  Search(){
    this.type = 'search';
  }
  searchForList(){
    this.list = this.service.search(this.searchField.nativeElement.value,this.type,this.person.Nickname);
  }
}
