import { Injectable } from '@angular/core';
import {info, person} from "./classes";

@Injectable()
export class MainServiceService {

  constructor() { }
  public add_person(person : person):String{
    if(this.checkExist(person)==null) {
      sessionStorage.clear();
      sessionStorage.setItem("Nickname", person.Nickname);
      localStorage.setItem(person.Nickname, JSON.stringify(person));
      location.replace('/timeTO/'+person.Nickname);
      return null;
    }
    else return "This nickname is already registered";
  }
  public checkPassword(person:person):boolean{
    if(JSON.parse(localStorage.getItem(person.Nickname)).password==person.password) {
      sessionStorage.clear();
      sessionStorage.setItem("Nickname",person.Nickname);
      location.replace('/timeTO/'+person.Nickname);
      return true;
    }
    return false;
  }
  public checkNickname(person:person):boolean{
    return localStorage.getItem(person.Nickname)==null;
  }
  public checkExist(person:person):String{
    return JSON.parse(localStorage.getItem(person.Nickname));
  }
  public auth():boolean{
    return sessionStorage.getItem("Nickname")==null;
  }
  public out():void{
    sessionStorage.clear();
  }
  public changeInfo(info):void{
    localStorage.setItem(sessionStorage.getItem('Nickname')+':info',info);
  }
  public addPost(posts):void{
    if (localStorage.getItem(sessionStorage.getItem('Nickname') + ':posts') == null) {
      let post = new Array(1);
      post[0] = posts;
      localStorage.setItem(sessionStorage.getItem('Nickname') + ':posts', JSON.stringify(post));
      location.replace('/timeTO/'+sessionStorage.getItem('Nickname'));
    }
    else {
      let oldPosts = JSON.parse(localStorage.getItem(sessionStorage.getItem('Nickname') + ':posts'));
      let post = oldPosts.concat(posts);
      localStorage.setItem(sessionStorage.getItem('Nickname') + ':posts', JSON.stringify(post));
      location.replace('/timeTO/'+sessionStorage.getItem('Nickname'));
    }
  }
  public getPerson(Nickname):person{
    return JSON.parse(localStorage.getItem(Nickname));
  }
  public getInfo(Nickname):info{
    return JSON.parse(localStorage.getItem(Nickname+':info'));
  }
  public isAuthPerson(Nickname):boolean{
    return sessionStorage.getItem("Nickname")==Nickname;
  }
}
