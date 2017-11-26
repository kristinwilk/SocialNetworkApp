import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  conversations;
  isChosenDialog = false;
  Nickname;
  ngOnInit() {
    this.conversations = this.service.getConversations(this.service.getMainPerson().Nickname);
  }
  showMessages(Nickname){
    this.isChosenDialog = true;
    this.Nickname = Nickname;

  }
}
