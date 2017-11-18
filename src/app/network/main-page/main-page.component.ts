import {Component, Input, OnInit, Output} from '@angular/core';
import {person, post} from "../../classes";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }
  array;
  @Input() person = new person();
  user;
  posts = new post();
  compare(posts2,posts1){
    return Date.parse(posts1.time) - Date.parse(posts2.time);
  }
  ngOnInit() {
    this.array = JSON.parse(localStorage.getItem(this.person.Nickname +':posts'));
    if(this.array!=null)
      this.array.sort(this.compare);
    this.user = this.person;
  }

}
