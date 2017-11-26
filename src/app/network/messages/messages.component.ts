import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainServiceService} from "../../main-service.service";
import {conversation} from "../../classes";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @ViewChild('search') searchField:ElementRef;
  constructor(private service:MainServiceService,private router:Router,private route : ActivatedRoute) { }
  conversations;
  isChosenDialog = false;
  Nickname;
  ngOnInit() {
    this.route.params.subscribe(params =>{
      let person = params['Nickname'];
      if(person!=null)
        this.isChosenDialog = true;
        this.Nickname = person;
    });
    function compare(a1, a2) {
      function eq(a1, a2){
        return(a1.Count==a2.Count&&a1.Nickname==a2.Nickname);
      }
      return a1.length == a2.length && a1.every((v,i)=>eq(v,a2[i]));
    }
    setInterval(()=>{
      if(this.searchField.nativeElement.value=='') {
        let newList = this.service.getConversations(this.service.getMainPerson().Nickname);
        if (this.conversations == null||newList == null || !compare(newList, this.conversations)) {
          this.conversations = newList;
        }
      }
      else {
        let newList = this.service.searchConversations(this.searchField.nativeElement.value);
        if (this.conversations == null||newList == null || !compare(newList, this.conversations)) {
          this.conversations = newList;
        }
      }

    },1);
  }
  showMessages(Nickname){
    this.isChosenDialog = true;
    this.Nickname = Nickname;
  }
}
