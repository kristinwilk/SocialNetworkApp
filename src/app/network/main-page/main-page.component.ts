import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }
  array;
  posts = {
    likes: null,
    time:new Date(),
    text:''
  };
  compare(posts2,posts1){
    debugger;
    return Date.parse(posts1.time) - Date.parse(posts2.time);
  }
  ngOnInit() {
    this.array = JSON.parse(localStorage.getItem(sessionStorage.getItem('email')+':posts'));
    if(this.array!=null)
      this.array.sort(this.compare);
  }

}
