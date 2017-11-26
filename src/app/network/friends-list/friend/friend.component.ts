import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {type} from "os";
import {Router} from "@angular/router";

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
  Url = "assets/img.Images_Pic_tmp.jpg";
  constructor(private service:MainServiceService,private router:Router) { }
  @Input() person = new person();
  @Input() isAuth;
  ngOnInit() {
    if (this.service.getAvatar(this.person[0]) != null) {
      this.Url = this.service.getAvatar(this.person[0]);
    }
    if(this.person[1]=='friend'){
      this.accept.nativeElement.style.display = 'none';
    }
    if(this.person[1]=='invite'){
    }
    if(this.person[1]=='sentInvite'){
      this.accept.nativeElement.style.display = 'none';
      this.Remove = 'Cancel';
    }
    if(this.person[1]=='follower'){
      this.remove.nativeElement.style.display = 'none';
    }
    if(this.person[1]=='search'){
      this.remove.nativeElement.style.display = 'none';
      this.Accept = 'Invite';
    }
    if(this.isAuth==0){
      this.remove.nativeElement.style.display = 'none';
      this.accept.nativeElement.style.display = 'none';
      this.message.nativeElement.style.display = 'none';
    }
  }
  removeMethod(){
    if(this.person[1]=='friend'){
      this.service.removeFromFriendsList(this.person[0]);
    }
    if(this.person[1]=='invite'){
      this.service.removeInviteAddFollower(this.service.getMainPerson().Nickname,this.person[0]);
    }
    if(this.person[1]=='sentInvite'){
      this.service.cancelInvite(this.person[0]);
    }
  }
  acceptMethod(){
    if(this.person[1]=='search'){
      this.service.inviteFriend(this.person[0]);
    }
    if(this.person[1]=='invite'){
      this.service.addToFriendsList(this.person[0]);
    }
    if(this.person[1]=='follower'){
      this.service.addToFriendsList(this.person[0]);
    }
  }
  messageMethod(){
    this.router.navigate(['/messages/'+this.person[0]]);
  }
}
