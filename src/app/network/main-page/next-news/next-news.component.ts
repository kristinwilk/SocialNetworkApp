import { Component, OnInit } from '@angular/core';
import {post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";
@Component({
  selector: 'app-next-news',
  templateUrl: './next-news.component.html',
  styleUrls: ['./next-news.component.scss']
})
export class NextNewsComponent implements OnInit {

  constructor(private service: MainServiceService) { }
  posts = new post();
  ngOnInit() {
  }
  add(){
    if(this.posts.text!='') {
      this.posts.time = new Date();
      this.posts.id = this.posts.time.valueOf();
      this.service.addPost(this.posts);
    }
  }
}
