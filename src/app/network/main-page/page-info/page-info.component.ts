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
  constructor(private service: MainServiceService) { }
  @Input() person = new person();
  ngOnInit() {
    if(this.service.getAvatar(this.person.Nickname)!=null){
      document.getElementById('avatar').setAttribute("src",this.service.getAvatar(this.person.Nickname));
    }
    if(!this.service.isAuthPerson(this.person.Nickname)){
      document.getElementById('Edit').style.display = 'none';
      document.getElementById('invite').style.display = 'inline-block';
      document.getElementById('message').style.display = 'inline-block';
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
      document.getElementById('profile_pic').style.display = 'inline-block';
      this.textInfo.edit();
    }
    else{
      this.isEditing = 'Edit';
      document.getElementById('profile_pic').style.display = 'none';
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
    let input = document.querySelector('input');
    let curFiles = input.files;
    document.getElementById('avatar').setAttribute('src',window.URL.createObjectURL(curFiles[0]));
    this.getBase64Image(document.querySelector('input').files[0]);
  }
  getBase64Image(img:File) {
    let myReader:FileReader = new FileReader();
    let image = 0;
    myReader.onloadend = (e) => {
      image = myReader.result;
      this.service.setAvatar(image);
    };
    myReader.readAsDataURL(img);
  }
}
