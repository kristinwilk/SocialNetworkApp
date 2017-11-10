import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }
  @Input() post = {
    likes: null,
    time:null,
    text:''
  };
  time;
  isEditing = false;
  ngOnInit() {
    this.time = new Date(this.post.time).toLocaleString();
  }
  edit(){
    this.isEditing = !this.isEditing;
    if(this.isEditing) {
      document.getElementById('message').removeAttribute('disabled');
    }
    else{
      document.getElementById('message').setAttribute('disabled','true');
    }

  }
  delete(){

  }
}
