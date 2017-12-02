import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TextInfoComponent} from "./text-info/text-info.component";
import {person} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss']
})
export class PageInfoComponent implements OnInit {
  @ViewChild(TextInfoComponent) textInfo : TextInfoComponent;
  @ViewChild('img') img:ElementRef;
  @ViewChild('Input') Input:ElementRef;
  @ViewChild('Delete') Delete:ElementRef;
  isEditing = 'Edit';
  isInvited = 'Invite';
  isAdded = 'Remove';
  Edit = 'inline-block';
  Remove = 'none';
  Invite = 'none';
  file;
  Message = 'none';
  temp;
  src ="assets/img.Images_Pic_tmp.jpg";
  constructor(private service: MainServiceService,private router:Router) { }
  @Input() person = new person();
  ngOnInit() {
    this.temp = this.src;
    if(this.service.getAvatar(this.person.Nickname)!=null){
      this.src = this.service.getAvatar(this.person.Nickname);
      this.temp = this.src;
    }
    if(!this.service.isAuthPerson(this.person.Nickname)){
      this.Edit = 'none';
      if(this.service.hasFriend(this.person.Nickname)){
        this.Remove = 'inline-block';
      }
      else if(this.service.hasInvite(this.person.Nickname)||this.service.hasFollower(this.person.Nickname)){
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
      if(this.file!=null) {
        this.img.nativeElement.style.display = 'none';
        this.Delete.nativeElement.style.display = 'none';
        let myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
          this.service.setAvatar(myReader.result);
        };
        myReader.readAsDataURL(this.file);
      }
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
  changeBackground(event){
    if(event.srcElement.files[0]!=null) {
      this.file = event.srcElement.files[0];
      let myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.src = myReader.result.toString();
        this.Input.nativeElement.value = "";
        this.img.nativeElement.style.display = 'inline-block';
        this.Delete.nativeElement.style.display = 'inline-block';
      };
      myReader.readAsDataURL(this.file);
    }
  }
  removeImage(){
    if(this.file!=null) {
      this.img.nativeElement.style.display = 'none';
      this.Delete.nativeElement.style.display = 'none';
      this.src = this.temp;
      this.file = null;
    }
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
  message(){
    this.router.navigate(['/messages/'+this.person.Nickname]);
  }
}
