import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {Router} from "@angular/router";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(private service : MainServiceService,private router:Router) { }
  @ViewChild('TextField') el:ElementRef;
  @ViewChild('Post') Post:ElementRef;
  @ViewChild('EditButton') EditButton:ElementRef;
  @ViewChild('DeleteButton') DeleteButton:ElementRef;
  @ViewChild('Avatar') Avatar:ElementRef;
  @ViewChild('BigAvatar') BigAvatar:ElementRef;
  @ViewChild('A') A:ElementRef;

  @Input() post = new post();
  @Input() person = new person();
  Url = "assets/img.Images_Pic_tmp.jpg";
  Nickname;
  isAvatar  = '';
  time;
  isEditing = false;
  src;
  count = 0;
  Like = 'assets/notLiked.png';
  Height = 150;
  ngOnInit() {
    if(this.post.likes!=null) {
      this.count = this.post.likes.length;
      if (this.post.likes.indexOf(this.service.getMainPerson().Nickname) != -1) {
        this.Like = 'assets/liked.png';
      }
    }
    this.Nickname = this.post.Nickname;
    this.time = new Date(this.post.time).toLocaleString();
    if(this.post.text.indexOf("data:image/png;base64,")!=-1||(this.post.text.indexOf("data:image/jpeg;base64,")!=-1)||(this.post.text.indexOf("data:image/jpg;base64,")!=-1)){
      this.EditButton.nativeElement.style.display = 'none';
      this.el.nativeElement.remove();
      this.isAvatar  = ' has changed his avatar:';
      this.src = this.post.text;
      this.Height = 405;
    }
    else {
      this.BigAvatar.nativeElement.remove();
    }
    if (this.service.getAvatar(this.post.Nickname) != null) {
      this.Url = this.service.getAvatar(this.post.Nickname);
    }
    if(this.person!=null) {
      if (this.service.isAuthPerson(this.post.Nickname)) {
        return;
      }
      this.EditButton.nativeElement.style.display = 'none';
      if (!this.service.isAuthPerson(this.person.Nickname)) {
        this.DeleteButton.nativeElement.style.display = 'none';
      }
    }
    else{
      this.DeleteButton.nativeElement.style.display = 'none';
      this.EditButton.nativeElement.style.display = 'none';
    }
  }
  edit(){
    this.isEditing = !this.isEditing;
    if(this.isEditing) {
      this.el.nativeElement.removeAttribute("disabled");
    }
    else{
      this.post.text = this.el.nativeElement.value;
      this.service.editPost(this.post,this.person.Nickname);
      this.el.nativeElement.setAttribute('disabled','true');
    }

  }
  Delete(){
    this.service.removePost(this.post,this.person.Nickname);
    this.Post.nativeElement.remove();
  }
  changeLocation(){
    this.A.nativeElement.click();
  }
  like(){
    this.service.like(this.post);
    if(this.Like == 'assets/liked.png'){
      this.Like = 'assets/notLiked.png';
      this.count--;
    }
    else {
      this.Like = 'assets/liked.png';
      this.count++;
    }
  }
}
