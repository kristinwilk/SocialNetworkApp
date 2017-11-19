import { Injectable } from '@angular/core';
import {info, person, post} from "./classes";

@Injectable()
export class MainServiceService {

  constructor() { }
  public add_person(person : person):String{
    if(this.checkExist(person)==null) {
      if(localStorage.getItem("persons")==null){
        let persons = new Array(1);
        persons[0] = person.Nickname;
        localStorage.setItem("persons",JSON.stringify(persons));
      }
      else{
        let persons = JSON.parse(localStorage.getItem('persons'));
        let newPerson = persons.concat(person.Nickname);
        localStorage.setItem('persons', JSON.stringify(newPerson));
      }
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
  public addPost(posts,person):void{
    if (localStorage.getItem(person.Nickname + ':posts') == null) {
      let post = new Array(1);
      post[0] = posts;
      localStorage.setItem(person.Nickname + ':posts', JSON.stringify(post));
      location.replace('/timeTO/'+person.Nickname);
    }
    else {
      let oldPosts = JSON.parse(localStorage.getItem(person.Nickname + ':posts'));
      let post = oldPosts.concat(posts);
      localStorage.setItem(person.Nickname + ':posts', JSON.stringify(post));
      location.replace('/timeTO/'+person.Nickname);
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
  public getMainPerson():person{
    return JSON.parse(localStorage.getItem(sessionStorage.getItem("Nickname")));
  }
  public removePost(post:post,Nickname):void{
    let posts = JSON.parse(localStorage.getItem(Nickname +':posts'));
    for(var i = 0;i<posts.length;i++){
      if(posts[i].id == post.id){
        posts.splice(i,1);
        this.setAllPosts(Nickname,posts);
        return;
      }
    }
  }
  public editPost(post:post,Nickname):void{
    let posts = JSON.parse(localStorage.getItem(Nickname +':posts'));
    for(var i = 0;i<posts.length;i++){
      if(posts[i].id == post.id){
        post.time = new Date();
        posts[i] = post;
        this.setAllPosts(Nickname,posts);
        return;
      }
    }
  }
  public getAllPosts(Nickname):post{
    return JSON.parse(localStorage.getItem(Nickname +':posts'));
  }
  public setAllPosts(Nickname,posts):void{
    localStorage.setItem(Nickname +':posts',JSON.stringify(posts));
  }
  public inviteFriend(Nickname):void{
    if (localStorage.getItem(Nickname + ':invites') == null) {
      let invite = new Array(1);
      invite[0] = sessionStorage.getItem("Nickname");
      localStorage.setItem(Nickname + ':invites', JSON.stringify(invite));
    }
    else {
      let oldInvites = JSON.parse(localStorage.getItem(Nickname + ':invites'));
      let invite = oldInvites.concat(sessionStorage.getItem("Nickname"));
      localStorage.setItem(Nickname + ':invites', JSON.stringify(invite));
    }
    if (localStorage.getItem(sessionStorage.getItem("Nickname") + ':sentInvites') == null) {
      let invite = new Array(1);
      invite[0] = Nickname;
      localStorage.setItem(sessionStorage.getItem("Nickname") + ':sentInvites', JSON.stringify(invite));
    }
    else {
      let oldInvites = JSON.parse(localStorage.getItem(sessionStorage.getItem("Nickname") + ':sentInvites'));
      let invite = oldInvites.concat(Nickname);
      localStorage.setItem(sessionStorage.getItem("Nickname") + ':sentInvites', JSON.stringify(invite));
    }
  }
  public getAllFriends(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':friends'));
  }
  public getAllInvites(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':friends'));
  }
  public getAllSentInvites(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':friends'));
  }
  public search(Text,type,Nickname):any{
    let persons;
    if(type = 0) {
      persons = JSON.parse(localStorage.getItem("persons"));
    }
    if(type = 1) {
      persons = JSON.parse(localStorage.getItem(Nickname+':friends'));
    }
    if(type = 2) {
      persons = JSON.parse(localStorage.getItem(Nickname+':invites'));
    }
    if(type = 3) {
      persons = JSON.parse(localStorage.getItem(Nickname+':sentInvites'));
    }
    let result = new Array(0);
    for(let i = 0;i<persons.length;i++){
      let person = JSON.parse(localStorage.getItem(persons[i]));
      if(person.Nickname.indexOf(Text)!=-1||person.Surname.indexOf(Text)!=-1||person.Name.indexOf(Text)!=-1){
        result.concat(person);
      }
    }
    return result;
  }
}
