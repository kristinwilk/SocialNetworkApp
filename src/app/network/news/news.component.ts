import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../../main-service.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private service:MainServiceService) { }
  array;
  ngOnInit() {
    this.array = this.service.getNews();

    if(this.array!=null) {
      this.array.sort(this.compare);
    }
  }
  compare(posts2,posts1){
    return Date.parse(posts1.time) - Date.parse(posts2.time);
  }
}
