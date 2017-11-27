import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MainServiceService} from "../../../../main-service.service";
import {setTimeout} from "timers";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  @ViewChild('dialog') dialog:ElementRef;
  @Input() isStorage;
  @Input() Nickname;
  messages;

  ngOnInit() {
    function compare(a1, a2) {
      function eq(a1, a2){
          return(a1.time.valueOf()==a2.time.valueOf()&&a1.Nickname==a2.Nickname&&a1.text==a2.text);
      }
      return a1.length == a2.length && a1.every((v,i)=>eq(v,a2[i]));
    }
    setInterval(()=>{
      let newList;
      if(this.isStorage)
        newList = this.service.getStorageMessages();
      else
        newList = this.service.getMessages(this.Nickname);
      if(this.messages==null||newList==null||!compare(newList,this.messages)) {
        this.messages = newList;
        this.service.conversationChecked(this.Nickname);
        setTimeout(()=> {
          this.dialog.nativeElement.scrollTo(0, this.dialog.nativeElement.scrollHeight * 2);
        },1);
      }
    },1);
  }
}
