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
    function compare(a1, a2) {
      function eq(a1, a2){
        return(a1.Count==a2.Count&&a1.Nickname==a2.Nickname);
      }
      return a1.length == a2.length && a1.every((v,i)=>eq(v,a2[i]));
    }
    setInterval(()=>{
      let newList = this.service.getConversations(this.service.getMainPerson().Nickname);
      if(this.conversations==null||newList==null||!compare(newList,this.conversations)) {
        this.conversations = newList;
      }
    },1);
  }
  showMessages(Nickname){
    this.isChosenDialog = true;
    this.Nickname = Nickname;
  }
}
