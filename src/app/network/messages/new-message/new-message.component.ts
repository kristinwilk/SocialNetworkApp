import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MainServiceService} from "../../../main-service.service";
import {message} from "../../../classes";
import set = Reflect.set;

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit, OnChanges {
  @Input() Nickname;
  @ViewChild('text') text:ElementRef;
  @ViewChild('img') img:ElementRef;
  @ViewChild('Input') Input:ElementRef;
  @ViewChild('Delete') Delete:ElementRef;
  @ViewChild('Photo') Photo:ElementRef;
  @ViewChild('Submit') Submit:ElementRef;
  @Input() isStorage;
  Text;
  constructor(private service:MainServiceService) { }
  src = '';
  file;
  friend = this.service.hasFriend(this.Nickname);
  settings = null;
  Nick = this.Nickname;
  messages = [];
  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }
  ngOnInit() {
    setInterval(()=> {
      if(this.Nick!=this.Nickname)
        if(this.messages[this.Nickname + ":img"]==""||this.messages[this.Nickname + ":img"]==null) {
          if(this.src!='') {
            this.Input.nativeElement.value = "";
            this.removeImage();
          }
        }
      if(this.Nick!=this.Nickname && this.messages[this.Nickname]!=null) {
        this.check_settings();
        this.Text = this.messages[this.Nickname];
        if (this.messages[this.Nickname + ":img"] != null && this.messages[this.Nickname + ":img"] !='') {
          this.src = this.messages[this.Nickname + ":img"];
          this.img.nativeElement.style.display = 'inline-block';
          this.Delete.nativeElement.style.display = 'inline-block';
        }
      }
      if(this.messages[this.Nickname]==null)
        this.Text = '';
      this.messages[this.Nickname] = this.Text;
      this.messages[this.Nickname+ ":img"] = this.src;
      let settings = this.service.getSettings(this.Nickname);
      this.Nick=this.Nickname;
      if (settings == null) {
        if (this.text.nativeElement.hasAttribute('disabled')){
          this.check_settings();
        }
        this.friend = this.service.hasFriend(this.Nickname);
        this.Nick=this.Nickname;
        this.settings = null;
        return;
      }
      if (this.settings != null && this.settings[1] == settings[1] && this.friend == this.service.hasFriend(this.Nickname))
        return;
      if (this.isStorage)
        return;
      if (settings[1] == 'All') {
        if(this.settings != null && this.settings[1]!=settings[1]) {
          this.check_settings();
          this.Nick=this.Nickname;
          this.settings = settings;
        }
        return;
      }
      if (this.service.hasFriend(this.Nickname)) {
        if(this.friend!=this.service.hasFriend(this.Nickname)) {
          this.check_settings();
          this.Nick=this.Nickname;
          this.settings = settings;
          this.friend = this.service.hasFriend(this.Nickname);
        }
        return;
      }
      this.text.nativeElement.setAttribute('disabled', 'true');
      this.Text = this.Nickname + ' has restricted the list of persons who can send messages to him';
      this.Submit.nativeElement.style.display = 'none';
      this.Photo.nativeElement.style.display = 'none';
      this.settings = settings;
      this.removeImage();
      this.Nick=this.Nickname;
      this.friend = this.service.hasFriend(this.Nickname);
    },1);
  }
  check_settings() {
    this.Submit.nativeElement.style.display = 'inline-block';
    this.Photo.nativeElement.style.display = 'inline-block';
    if(this.Text == this.Nick + ' has restricted the list of persons who can send messages to him')
      this.Text = '';
    this.text.nativeElement.removeAttribute('disabled');
  }
  addMessage(){
    if(this.Text!=''||this.src!='') {
      let mess = new message();
      if (this.src != null)
        mess.img = this.src;
      mess.Nickname = this.service.getMainPerson().Nickname;
      mess.time = new Date();
      mess.text = this.Text;
      this.Text = '';
      this.text.nativeElement.value = '';
      this.Input.nativeElement.value = "";
      this.src = "";
      this.img.nativeElement.style.display = 'none';
      this.Delete.nativeElement.style.display = 'none';
      if(this.isStorage){
        this.service.addStorageMessage(mess);
        return;
      }
      this.service.addMessage(this.Nickname, mess);
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
      this.src = '';
    }
  }
}
