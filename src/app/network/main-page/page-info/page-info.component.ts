import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TextInfoComponent} from "./text-info/text-info.component";
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  @ViewChild(TextInfoComponent) textInfo : TextInfoComponent;
  isEditing = 'Edit';
  isInvited = 'Invite';
  isAdded = 'Remove';
  Edit = 'inline-block';
  Remove = 'none';
  Invite = 'none';
  Message = 'none';
  src ="assets/img.Images_Pic_tmp.jpg";
  constructor(private service: MainServiceService) { }
  @Input() person = new person();
  ngOnInit() {
    if(this.service.getAvatar(this.person.Nickname)!=null){
      this.src = this.service.getAvatar(this.person.Nickname);
    }
    if(!this.service.isAuthPerson(this.person.Nickname)){
      this.Edit = 'none';
      if(this.service.hasFriend(this.person.Nickname)){
        this.Remove = 'inline-block';
      }
      else if(this.service.hasInvite(this.person.Nickname)){
        this.isAdded = 'Accept invite';
        this.Remove = 'inline-block';
      }
      else {
        this.Invite = 'inline-block';
      }
      this.Message = 'inline-block';
    }
    let invites = this.service.getAllSentInvites(sessionStorage.getItem("Nickname"));
    if(invites!=null) {
      for (let i = 0; i < invites.length; i++) {
        if (invites[i] == this.person.Nickname) {
          this.isInvited = 'Cancel invite';
          break;
        }
      }
    }
  }
  edit(){
    if(this.isEditing=='Edit'){
      this.isEditing = 'Ok';
      this.textInfo.edit();
    }
    else{
      this.isEditing = 'Edit';
      let myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.service.setAvatar(myReader.result);
      };
      myReader.readAsDataURL(document.querySelector('input').files[0]);
      this.textInfo.endOfEdit();
    }
  }
  invite(){
    if(this.isInvited=='Cancel invite'){
      this.service.cancelInvite(this.person.Nickname);
      this.isInvited='Invite';
    }
    else {
      this.service.inviteFriend(this.person.Nickname);
      this.isInvited='Cancel invite';
    }
  }
  changeBackground(){
    let myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.src = myReader.result.toString();
    };
    myReader.readAsDataURL(document.querySelector('input').files[0]);
  }
  remove(){
    if(this.isAdded=='Remove') {
      this.service.removeFromFriendsList(this.person.Nickname);
      this.isAdded = 'Accept invite';
    }
    else{
      this.service.addToFriendsList(this.person.Nickname);
      this.isAdded = 'Remove';
    }
  }
}
