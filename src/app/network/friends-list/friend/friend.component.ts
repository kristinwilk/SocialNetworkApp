import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {type} from "os";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @ViewChild('remove') remove:ElementRef;
  @ViewChild('message') message:ElementRef;
  @ViewChild('accept') accept:ElementRef;
  Remove = 'Remove';
  Message = 'Message';
  Accept = 'Accept';
  constructor(private service:MainServiceService) { }
  @Input() person = new person();
  @Input() type;
  ngOnInit() {
    if(this.type=='friend'){
      this.accept.nativeElement.style.display = 'none';
    }
    if(this.type=='invite'){
    }
    if(this.type=='sentInvites'){
      this.accept.nativeElement.style.display = 'none';
      this.Remove = 'Cancel';
    }
    if(this.type=='follower'){
      this.remove.nativeElement.style.display = 'none';
    }
    if(this.type=='search'){
      this.remove.nativeElement.style.display = 'none';
      this.Accept = 'Invite';
    }
  }
  removeMethod(){
    if(this.type=='friend'){
      this.service.removeFromFriendsList(this.person);
    }
    if(this.type=='invite'){
      this.service.removeInviteAddFollower(this.service.getMainPerson(),this.person);
    }
    if(this.type=='sentInvite'){
      this.service.cancelInvite(this.person);
    }
  }
  acceptMethod(){
    if(this.type=='search'){
      this.service.inviteFriend(this.person);
    }
    if(this.type=='invite'){
      this.service.addToFriendsList(this.person);
    }
    if(this.type=='follower'){
      this.service.addToFriendsList(this.person);
    }
  }
  messageMethod(){

  }
  set(type){
    this.type = type;
  }
}
