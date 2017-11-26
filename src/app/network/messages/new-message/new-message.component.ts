import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MainServiceService} from "../../../main-service.service";
import {message} from "../../../classes";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  @Input() Nickname;
  @ViewChild('text') text:ElementRef;
  Text;
  constructor(private service:MainServiceService) { }

  ngOnInit() {
  }
  addMessage(){
    let mess = new message();
    mess.Nickname = this.service.getMainPerson().Nickname;
    mess.time = new Date();
    mess.text = this.Text;
    this.Text = '';
    this.text.nativeElement.value  = '';
    this.service.addMessage(this.Nickname,mess);
  }
}
