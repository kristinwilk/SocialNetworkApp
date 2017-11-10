import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-next-news',
  templateUrl: './next-news.component.html',
  styleUrls: ['./next-news.component.scss']
})
export class NextNewsComponent implements OnInit {

  constructor() { }
  posts = {
    likes: null,
    time:null,
    text:''
  };
  ngOnInit() {
  }
  add(){
    if(this.posts.text!='') {
      this.posts.time = new Date();
      if (localStorage.getItem(sessionStorage.getItem('email') + ':posts') == null) {
        let post = new Array(1);
        post[0] = this.posts;
        localStorage.setItem(sessionStorage.getItem('email') + ':posts', JSON.stringify(post));
        location.replace('/timeTO');
      }
      else {
        let oldPosts = JSON.parse(localStorage.getItem(sessionStorage.getItem('email') + ':posts'));
        let post = oldPosts.concat(this.posts);
        localStorage.setItem(sessionStorage.getItem('email') + ':posts', JSON.stringify(post));
        location.replace('/timeTO');
      }
    }
  }
}
