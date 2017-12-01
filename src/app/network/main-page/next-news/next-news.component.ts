import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import set = Reflect.set;
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
  friend = this.service.hasFriend(this.person.Nickname);
  settings = null;
  ngOnInit() {
    setInterval(()=>{
      let settings = this.service.getSettings(this.person.Nickname);
      if(settings==null)
        return;
      if(this.settings!=null&&this.settings[2]==settings[2]&&this.friend==this.service.hasFriend(this.person.Nickname))
        return;
      if(this.service.isAuthPerson(this.person.Nickname)) {
        return;
      }
      if(settings[2]=='All') {
        if(this.settings[2]!=settings[2]) {
          this.check_settings();
          this.settings = settings;
        }
        return;
      }
      if(settings[2]=='Friends')
        if(this.service.hasFriend(this.person.Nickname)){
          if(this.settings[2]!=settings[2]||this.friend!=this.service.hasFriend(this.person.Nickname)) {
            this.check_settings();
            this.settings = settings;
            this.friend = this.service.hasFriend(this.person.Nickname);
          }
          return;
        }
      this.text.nativeElement.setAttribute('disabled','true');
      this.posts.text = this.person.Nickname + ' has restricted the list of persons who can add posts on his page';
      this.Submit.nativeElement.style.display = 'none';
      this.Photo.nativeElement.style.display = 'none';
      this.settings = settings;
      this.friend = this.service.hasFriend(this.person.Nickname);
    },1);
  }
  check_settings(){
    this.text.nativeElement.removeAttribute('disabled');
    this.posts.text = '';
    if(this.posts.text == this.person.Nickname + ' has restricted the list of persons who can add posts on his page')
      this.posts.text = '';
    this.Submit.nativeElement.style.display = 'inline-block';
    this.Photo.nativeElement.style.display = 'inline-block';
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
