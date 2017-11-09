import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-info',
  templateUrl: './text-info.component.html',
  styleUrls: ['./text-info.component.scss']
})
export class TextInfoComponent implements OnInit {

  info = {
    age:'',
    phone:'',
    city:'',
    interests:''
  };
  constructor() { }

  ngOnInit() {
    let info =  localStorage.getItem(sessionStorage.getItem('email')+':info');
    if(info!=null)
      this.info = JSON.parse(info);
  }

  check(event) {

    if (event.ctrlKey || event.altKey || event.metaKey) return;

    if (event.keyCode< '0' || event.keyCode > '9') {
      return false;
    }
  }
  public edit(){
    document.getElementById('age').removeAttribute('disabled');
    document.getElementById('city').removeAttribute('disabled');
    document.getElementById('phone').removeAttribute('disabled');
    document.getElementById('interests').removeAttribute('disabled');
  }
  public endOfEdit(){
    localStorage.setItem(sessionStorage.getItem('email')+':info',JSON.stringify(this.info));
    document.getElementById('age').setAttribute('disabled','true');
    document.getElementById('city').setAttribute('disabled','true');
    document.getElementById('phone').setAttribute('disabled','true');
    document.getElementById('interests').setAttribute('disabled','true');
  }

}
