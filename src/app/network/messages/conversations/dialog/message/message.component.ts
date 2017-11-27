import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {message} from "../../../../../classes";
import {MainServiceService} from "../../../../../main-service.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @ViewChild('Avatar') Avatar:ElementRef;
  @ViewChild('image') image:ElementRef;
  @ViewChild('Post') Post:ElementRef;
  @ViewChild('TextField') TextField:ElementRef;
  @Input() message = new message();
  constructor(private service:MainServiceService) { }
  Url = 'assets/img.Images_Pic_tmp.jpg';
  @ViewChild('A') A:ElementRef;
  time;
  ngOnInit() {
    this.time = new Date(this.message.time).toLocaleString();
    if (this.service.getAvatar(this.message.Nickname) != null) {
      this.Url = this.service.getAvatar(this.message.Nickname);
    }
  }
  changeLocation(){
    this.A.nativeElement.click();
  }
}
