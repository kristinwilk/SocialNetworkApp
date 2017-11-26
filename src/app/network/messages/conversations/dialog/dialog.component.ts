import {Component, Input, OnInit} from '@angular/core';
import {MainServiceService} from "../../../../main-service.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  @Input() Nickname;
  messages;

  ngOnInit() {
    setInterval(()=>{
      this.messages = this.service.getMessages(this.Nickname);
      // if(this.messages==null||newList==null||!this.compare(newList,this.list)) {
      //   this.list = newList;
      //   if (this.list != null) {
      //     for (let i = 0; i < this.list.length; i++) {
      //       this.list[i] = [this.list[i], this.type];
      //     }
      //   }
      // }
    },100);
  }
}
