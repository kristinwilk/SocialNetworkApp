import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {conversation} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  constructor(private service:MainServiceService,private router:Router) { }
  @Input() conversation = new conversation();
  @ViewChild('Conversation') Conversation:ElementRef;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Input() isStorage;
  Url = 'assets/img.Images_Pic_tmp.jpg';
  word = '';
  ngOnInit() {
    if (this.service.getAvatar(this.conversation.Nickname) != null) {
      this.Url = this.service.getAvatar(this.conversation.Nickname);
    }
    if(this.conversation.Count!=0){
      if(this.conversation.Count==1)
        this.word = '1 new message';
      else
        this.word = this.conversation.Count + ' new messages';
      this.Conversation.nativeElement.style.backgroundColor = 'rgb(125,133,152)';
    }
  }
  dialog(){
    if(!this.isStorage) {
      this.Conversation.nativeElement.style.backgroundColor = 'rgb(205,216,228)';
      this.service.conversationChecked(this.conversation.Nickname);
      this.router.navigate(['/messages/' + this.conversation.Nickname]);
      this.notify.emit(this.conversation.Nickname);
    }
  }

}
