import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {message} from "../../../../../classes";

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
  constructor() { }
  Url = 'assets/img.Images_Pic_tmp.jpg';
  ngOnInit() {
  }
}
