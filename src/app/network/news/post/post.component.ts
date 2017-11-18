import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {person, post} from "../../../classes";
import {MainServiceService} from "../../../main-service.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //inпut tie file
  constructor(private service : MainServiceService) { }
  @ViewChild('TextField') el:ElementRef;
  @ViewChild('Post') Post:ElementRef;

  @Input() post = new post();
  @Input() person = new person();
  time;
  isEditing = false;
  ngOnInit() {
    if(!this.service.isAuthPerson(this.person.Nickname)){
      document.getElementById('edit').style.display = 'none';
      document.getElementById('delete').style.display = 'none';
    }
    this.time = new Date(this.post.time).toLocaleString();
  }
  edit(){
    this.isEditing = !this.isEditing;
    if(this.isEditing) {
      this.el.nativeElement.removeAttribute("disabled");
    }
    else{
      this.el.nativeElement.setAttribute('disabled','true');
    }

  }
  Delete(){
    this.Post.nativeElement.remove();
  }
}
