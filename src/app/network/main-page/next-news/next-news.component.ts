import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
@Component({
  selector: 'app-next-news',
  templateUrl: './next-news.component.html',
  styleUrls: ['./next-news.component.scss']
})
export class NextNewsComponent implements OnInit {

  constructor(private service: MainServiceService) { }
  @ViewChild('text') text:ElementRef;
  @ViewChild('Delete') Delete:ElementRef;
  @ViewChild('Photo') Photo:ElementRef;
  @ViewChild('Submit') Submit:ElementRef;
  posts = new post();
  @Input() person = new person();
  ngOnInit() {
    let settings = this.service.getSettings(this.person.Nickname);
    if(settings==null)
      return;
    if(this.service.isAuthPerson(this.person.Nickname))
      return;
    if(settings[2]=='All')
      return;
    if(settings[2]=='Friends')
      if(this.service.hasFriend(this.person.Nickname))
        return;
    this.text.nativeElement.setAttribute('disabled','true');
    this.posts.text = this.person.Nickname + ' has restricted the list of persons who can add posts on his page';
    this.Submit.nativeElement.style.display = 'none';
    this.Photo.nativeElement.style.display = 'none';
  }
  add(){
    if(this.posts.text!='') {
      this.posts.time = new Date();
      this.posts.id = this.posts.time.valueOf();
      this.posts.Nickname = this.service.getMainPerson().Nickname;
      this.posts.likes = [];
      this.service.addPost(this.posts,this.person);
      this.posts.text = '';
    }
  }
}
