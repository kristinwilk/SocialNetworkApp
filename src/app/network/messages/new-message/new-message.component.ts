import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
  src;
  file;
  ngOnChanges() {
    this.ngOnInit();
  }
  ngOnInit() {
    this.Submit.nativeElement.style.display = 'inline-block';
    this.Photo.nativeElement.style.display = 'inline-block';
    this.Text = '';
    this.text.nativeElement.removeAttribute('disabled');
    if(this.isStorage)
      return;
    let settings = this.service.getSettings(this.Nickname);
    if(settings==null)
      return;
    if(settings[1]=='All')
      return;
    if(this.service.hasFriend(this.Nickname))
      return;
    this.text.nativeElement.setAttribute('disabled','true');
    this.Text = this.Nickname + ' has restricted the list of persons who can send messages to him';
    this.Submit.nativeElement.style.display = 'none';
    this.Photo.nativeElement.style.display = 'none';
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
