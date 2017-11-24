import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //inпut tie file
  constructor(private service : MainServiceService,private router:Router) { }
  @ViewChild('TextField') el:ElementRef;
  @ViewChild('Post') Post:ElementRef;
  @ViewChild('EditButton') EditButton:ElementRef;
  @ViewChild('DeleteButton') DeleteButton:ElementRef;
  @ViewChild('Avatar') Avatar:ElementRef;

  @Input() post = new post();
  @Input() person = new person();
  Url = "assets/img.Images_Pic_tmp.jpg";
  Nickname;
  time;
  isEditing = false;

  ngOnInit() {
    this.Nickname = this.post.Nickname;
    this.time = new Date(this.post.time).toLocaleString();
    // this.el.nativeElement.remove();
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
}
