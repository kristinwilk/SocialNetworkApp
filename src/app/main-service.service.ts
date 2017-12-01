import { Injectable } from '@angular/core';
import {conversation, info, person, post} from "./classes";
import {templateVisitAll} from "@angular/compiler";
import {type} from "os";

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
    posts.published = person.Nickname;
    if (localStorage.getItem(person.Nickname + ':posts') == null) {
      let post = new Array(1);
      post[0] = posts;
      localStorage.setItem(person.Nickname + ':posts', JSON.stringify(post));
    }
    else {
      let oldPosts = JSON.parse(localStorage.getItem(person.Nickname + ':posts'));
      let post = oldPosts.concat(posts);
      localStorage.setItem(person.Nickname + ':posts', JSON.stringify(post));
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
  public like(post:post):void{
    if(post.likes!=null) {
      if (post.likes.indexOf(this.getMainPerson().Nickname) != -1) {
        post.likes.splice(post.likes.indexOf(this.getMainPerson().Nickname),1);
      }
      else{
        post.likes = post.likes.concat(this.getMainPerson().Nickname);
      }
    }
    else{
      post.likes = [this.getMainPerson().Nickname];
    }
    let posts = JSON.parse(localStorage.getItem(post.published +':posts'));
    for(let i = 0;i<posts.length;i++){
      if(posts[i].id == post.id){
        posts[i] = post;
        this.setAllPosts(post.published,posts);
        return;
      }
    }
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
  public getAllPosts(Nickname):any{
    if(this.isAuthPerson(Nickname)||this.hasFriend(Nickname)||this.getSettings(Nickname)==null||this.getSettings(Nickname)[0]=='All')
      return JSON.parse(localStorage.getItem(Nickname +':posts'));
    return [];
  }
  public setAllPosts(Nickname,posts):void{
    localStorage.setItem(Nickname +':posts',JSON.stringify(posts));
  }
  public inviteFriend(Nickname):void{
    if (localStorage.getItem(Nickname + ':invites') == null||localStorage.getItem(Nickname + ':invites').length==0) {
      let invite = new Array(1);
      invite[0] = sessionStorage.getItem("Nickname");
      localStorage.setItem(Nickname + ':invites', JSON.stringify(invite));
    }
    else {
      let oldInvites = JSON.parse(localStorage.getItem(Nickname + ':invites'));
      let invite = oldInvites.concat(sessionStorage.getItem("Nickname"));
      localStorage.setItem(Nickname + ':invites', JSON.stringify(invite));
    }
    this.addSentInvites(sessionStorage.getItem("Nickname"),Nickname);
  }
  public getAllFriends(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':friends'));
  }
  public getAllInvites(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':invites'));
  }
  public getAllSentInvites(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':sentInvites'));
  }
  public search(Text,type,Nickname):any{
    let persons;
    if(type == "search"||type == "searchConversations") {
      persons = JSON.parse(localStorage.getItem("persons"));
    }
    // if(type == "searchConversations") {
    //   persons = JSON.parse(localStorage.getItem("persons"));
    //   if(this.getAllInvites(this.getMainPerson().Nickname)!=null) {
    //     if (persons == null)
    //       persons = this.getAllInvites(this.getMainPerson().Nickname);
    //     else
    //       persons = persons.concat(this.getAllInvites(this.getMainPerson().Nickname));
    //   }
    //   if(this.getAllSentInvites(this.getMainPerson().Nickname)!=null) {
    //     if (persons == null) {
    //       persons = this.getAllSentInvites(this.getMainPerson().Nickname);
    //     }
    //     else persons = persons.concat(this.getAllSentInvites(this.getMainPerson().Nickname));
    //   }
    // }
    else {
      persons = JSON.parse(localStorage.getItem(Nickname+':'+type+'s'));
    }
    if(persons == null){
      return;
    }
    let result = [];
    for(let i = 0;i<persons.length;i++){
      let person = JSON.parse(localStorage.getItem(persons[i]));
      if(person.Nickname.indexOf(Text)!=-1||person.Surname.indexOf(Text)!=-1||person.Name.indexOf(Text)!=-1){
        result = result.concat(person.Nickname);
      }
    }
    if(type == "search") {
      for (let i = result.length-1; i >= 0; i--) {
        let invites = JSON.parse(localStorage.getItem(Nickname + ':invites'));
        let friends = JSON.parse(localStorage.getItem(Nickname + ':friends'));
        let sentInvites = JSON.parse(localStorage.getItem(Nickname + ':sentInvites'));
        let followers = JSON.parse(localStorage.getItem(Nickname + ':followers'));
        if(invites!=null) {
          for (let j = 0; j < invites.length; j++) {
            if (result[i] == invites[j]) {
              result.splice(i, 1);
              invites.splice(j, 1);
            }
          }
        }
        if(friends!=null) {
          for (let j = 0; j < friends.length; j++) {
            if (result[i] == friends[j]) {
              result.splice(i, 1);
              friends.splice(j, 1);
            }
          }
        }
        if(sentInvites!=null) {
          for (let j = 0; j < sentInvites.length; j++) {
            if (result[i] == sentInvites[j]) {
              result.splice(i, 1);
              sentInvites.splice(j, 1);
            }
          }
        }
        if(followers!=null) {
          for (let j = 0; j < followers.length; j++) {
            if (result[i] == followers[j]) {
              result.splice(i, 1);
              followers.splice(j, 1);
            }
          }
        }
        if(result[i] == Nickname){
          result.splice(i,1);
        }
        }
      }
      if(type == "searchConversations") {
        for (let i = result.length-1; i >= 0; i--) {
          let friends = JSON.parse(localStorage.getItem(Nickname + ':friends'));
          if(friends!=null) {
            for (let j = 0; j < friends.length; j++) {
              if (result[i] == friends[j]) {
                result.splice(i, 1);
                friends.splice(j, 1);
              }
            }
          }
          if(result[i] == Nickname){
            result.splice(i,1);
          }
        }
      }
    return result;
  }
  public addToFriendsList(Nickname):void{
    if (localStorage.getItem(Nickname + ':friends') == null||localStorage.getItem(Nickname + ':friends').length==0)
      localStorage.setItem(Nickname + ':friends', JSON.stringify([sessionStorage.getItem("Nickname")]));
    else {
      let oldInvites = JSON.parse(localStorage.getItem(Nickname + ':friends'));
      let invite = oldInvites.concat(sessionStorage.getItem("Nickname"));
      localStorage.setItem(Nickname + ':friends', JSON.stringify(invite));
    }
    if (localStorage.getItem(sessionStorage.getItem("Nickname") + ':friends') == null||localStorage.getItem(sessionStorage.getItem("Nickname") + ':friends').length==0)
      localStorage.setItem(sessionStorage.getItem("Nickname") + ':friends', JSON.stringify([Nickname]));
    else {
      let oldInvites = JSON.parse(localStorage.getItem(sessionStorage.getItem("Nickname") + ':friends'));
      let invite = oldInvites.concat(Nickname);
      localStorage.setItem(sessionStorage.getItem("Nickname") + ':friends', JSON.stringify(invite));
    }
    this.removeInvite(sessionStorage.getItem("Nickname"),Nickname);
    this.removeFollower(sessionStorage.getItem("Nickname"),Nickname);
    this.removeSentInvite(Nickname,sessionStorage.getItem("Nickname"));
  }
  public removeFromFriendsList(Nickname):void{
    this.removeFriend(sessionStorage.getItem("Nickname"),Nickname);
    this.removeFriend(Nickname,sessionStorage.getItem("Nickname"));
    this.addFollower(sessionStorage.getItem("Nickname"),Nickname);
    this.addSentInvites(Nickname,sessionStorage.getItem("Nickname"));
  }
  public addFollower(Nickname1,Nickname2):void{
    if (localStorage.getItem(Nickname1 + ':followers') == null||localStorage.getItem(Nickname1 + ':followers').length==0) {
      let invite = new Array(1);
      invite[0] = Nickname2;
      localStorage.setItem(Nickname1 + ':followers', JSON.stringify(invite));
    }
    else {
      let oldInvites = JSON.parse(localStorage.getItem(Nickname1 + ':followers'));
      let invite = oldInvites.concat(Nickname2);
      localStorage.setItem(Nickname1 + ':followers', JSON.stringify(invite));
    }
  }
  public addSentInvites(Nickname1,Nickname2):void{
    if (localStorage.getItem(Nickname1 + ':sentInvites') == null||localStorage.getItem(Nickname1 + ':sentInvites').length==0) {
      let invite = new Array(1);
      invite[0] = Nickname2;
      localStorage.setItem(Nickname1 + ':sentInvites', JSON.stringify(invite));
    }
    else {
      let oldInvites = JSON.parse(localStorage.getItem(Nickname1 + ':sentInvites'));
      let invite = oldInvites.concat(Nickname2);
      localStorage.setItem(Nickname1 + ':sentInvites', JSON.stringify(invite));
    }
  }
  public removeFriend(Nickname1,Nickname2):void{
    let friendsList = this.getAllFriends(Nickname1);
    for(let i = 0;i < friendsList.length;i++){
      if(friendsList[i]==Nickname2){
        friendsList.splice(i,1);
        localStorage.setItem(Nickname1+":friends",JSON.stringify(friendsList));
        break;
      }
    }
  }
  public cancelInvite(Nickname):void{
    this.removeSentInvite(sessionStorage.getItem("Nickname"),Nickname);
    this.removeInvite(Nickname,sessionStorage.getItem("Nickname"));
    this.removeFollower(Nickname,sessionStorage.getItem("Nickname"));
  }
  public removeSentInvite(Nickname1,Nickname2):void{
    let sentInvites = JSON.parse(localStorage.getItem(Nickname1 + ':sentInvites'));
    if(sentInvites==null){
      return;
    }
    for(let i = 0;i<sentInvites.length;i++){
      if(sentInvites[i]==Nickname2){
        sentInvites.splice(i,1);
        localStorage.setItem(Nickname1 + ':sentInvites',JSON.stringify(sentInvites));
        break;
      }
    }
  }
  public removeFollower(Nickname1,Nickname2):void{
    let followers = JSON.parse(localStorage.getItem(Nickname1 + ':followers'));
    if(followers==null){
      return;
    }
    for(let i = 0;i<followers.length;i++){
      if(followers[i]==Nickname2){
        followers.splice(i,1);
        localStorage.setItem(Nickname1 + ':followers',JSON.stringify(followers));
        break;
      }
    }
  }
  public removeInviteAddFollower(Nickname1,Nickname2):void{
    this.removeInvite(Nickname1,Nickname2);
    this.addFollower(Nickname1,Nickname2);
  }
  public removeInvite(Nickname1,Nickname2):void{
    let invites = this.getAllInvites(Nickname1);
    if(invites==null){
      return;
    }
    for(let i = 0;i<invites.length;i++){
      if(invites[i]==Nickname2){
        invites.splice(i,1);
        localStorage.setItem(Nickname1 + ':invites',JSON.stringify(invites));
        break;
      }
    }
  }
  public getNews():any{
    let friends = this.getAllFriends(sessionStorage.getItem("Nickname"));
    if(friends==null)
      friends = this.getAllSentInvites(sessionStorage.getItem("Nickname"));
    else
      friends = friends.concat(this.getAllSentInvites(sessionStorage.getItem("Nickname")));
    let posts = [];
    if(friends!=null) {
      for (let i = 0; i < friends.length; i++) {
        if (friends[i] != sessionStorage.getItem("Nickname")) {
          posts = posts.concat(this.getAllPosts(friends[i]));
        }
      }
      for(let i = 0;i<posts.length;i++){
        if(posts[i].Nickname==sessionStorage.getItem("Nickname")){
          posts.splice(i,1);
        }
      }
    }
    // if(localStorage.getItem(sessionStorage.getItem("Nickname")+':otherNews')!=null)
    //   posts = posts.concat(JSON.parse(localStorage.getItem(sessionStorage.getItem("Nickname")+':otherNews')))
    return posts;
  }
  public getSettings(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':settings'));
  }
  public setSettings(settings):void{
    localStorage.setItem(sessionStorage.getItem("Nickname")+':settings',JSON.stringify(settings));
  }
  public deleteAccount():void{
    localStorage.removeItem(sessionStorage.getItem("Nickname"));
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':settings');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':followers');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':sentInvites');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':invites');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':friends');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':info');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':posts');
    localStorage.removeItem(sessionStorage.getItem("Nickname")+':messages');
    let persons = JSON.parse(localStorage.getItem('persons'));
    for(let i = 0;i<persons.length;i++){
      if(persons[i] == sessionStorage.getItem("Nickname")){
        persons.splice(i,1);
        break;
      }
    }
    localStorage.setItem('persons', JSON.stringify(persons));
  }
  public setAvatar(b64image):void{
    let news = new post();
    news.Nickname = sessionStorage.getItem("Nickname");
    news.text = b64image;
    news.time = new Date();
    news.id = news.time.valueOf();
    news.likes = [];
    this.addPost(news,this.getMainPerson());
    localStorage.setItem(sessionStorage.getItem("Nickname")+':avatar', b64image);
    location.replace('/timeTO/'+sessionStorage.getItem("Nickname"));
  }
  public getAvatar(Nickname):any{
    return localStorage.getItem(Nickname+':avatar');
  }
  public hasFriend(Nickname):boolean{
    let friends = this.getAllFriends(sessionStorage.getItem("Nickname"));
    if(friends == null){
      return false;
    }
    for(let i = 0;i<friends.length;i++){
      if(friends[i]==Nickname){
        return true;
      }
    }
    return false;
  }
  public hasInvite(Nickname):boolean{
    let friends = this.getAllInvites(sessionStorage.getItem("Nickname"));
    if(friends == null){
      return false;
    }
    for(let i = 0;i<friends.length;i++){
      if(friends[i]==Nickname){
        return true;
      }
    }
    return false;
  }
  public hasFollower(Nickname):boolean{
    let friends = this.getFollowers(sessionStorage.getItem("Nickname"));
    if(friends == null){
      return false;
    }
    for(let i = 0;i<friends.length;i++){
      if(friends[i]==Nickname){
        return true;
      }
    }
    return false;
  }
  public addConversation(Nickname,conversation):void{
    let conversations = this.getConversations(Nickname);
    if(conversations== null){
      this.setConversations(Nickname,[conversation]);
    }
    else {
      this.setConversations(Nickname,conversations.concat(conversation));
    }
  }
  public setConversations(Nickname,conversations):void{
    localStorage.setItem(Nickname+":conversations",JSON.stringify(conversations));
  }
  public getConversations(Nickname):any{
    function compare(conversations2,conversations1){
      if(conversations1.messages==null&&conversations2.messages==null)
        return 0;
      if(conversations1.messages==null)
        return -1;
      if(conversations2.messages==null)
        return 1;
      return Date.parse(conversations1.messages[conversations1.messages.length-1].time) - Date.parse(conversations2.messages[conversations2.messages.length-1].time.valueOf());
    }
    let conversations =  JSON.parse(localStorage.getItem(Nickname+":conversations"));
    if(conversations!=null) conversations.sort(compare);

    return conversations;
  }
  public hasConversation(Nickname):boolean{
    let conversations = this.getConversations(sessionStorage.getItem("Nickname"));
    if(conversations== null)
      return false;
    for(let i = 0;i < conversations.length;i++){
      if(conversations[i].Nickname == Nickname)
        return true;
    }
    return false;
  }
  public conversationChecked(Nickname):void{
    let conversations = this.getConversations(sessionStorage.getItem('Nickname'));
    if(conversations!=null) {
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].Nickname == Nickname) {
          conversations[i].Count = 0;
          this.setConversations(sessionStorage.getItem('Nickname'), conversations);
          return;
        }
      }
    }
  }
  public setMessages(Nickname,messages):void{

  }
  public addMessage(Nickname,message):void{
    if(this.hasConversation(Nickname)){
      let conversations = this.getConversations(sessionStorage.getItem("Nickname"));
      let conversationsNickname = this.getConversations(Nickname);
      for(let i = 0;i < conversations.length;i++){
        if(conversations[i].Nickname == Nickname){
          if(conversations[i].messages==null){
            conversations[i].messages = [message];
          }
          else {
            conversations[i].messages = conversations[i].messages.concat(message);
          }
          this.setConversations(sessionStorage.getItem("Nickname"),conversations);
          break;
        }
      }
      for(let i = 0;i < conversationsNickname.length;i++){
        if(conversationsNickname[i].Nickname == sessionStorage.getItem("Nickname")){
          if(conversationsNickname[i].messages==null){
            conversationsNickname[i].messages = [message];
          }
          else {
            conversationsNickname[i].messages = conversationsNickname[i].messages.concat(message);
          }
          conversationsNickname[i].Count++;
          this.setConversations(Nickname,conversationsNickname);
          break;
        }
      }
    }
    else{
      let newConversation = new conversation();
      newConversation.Nickname = Nickname;
      newConversation.messages = [message];
      newConversation.Count = 0;
      this.addConversation(sessionStorage.getItem("Nickname"),newConversation);
      newConversation.Count = 1;
      newConversation.Nickname = sessionStorage.getItem("Nickname");
      this.addConversation(Nickname,newConversation);
    }
  }
  public getMessages(Nickname):any{
    if(this.hasConversation(Nickname)){
      let conversations = this.getConversations(sessionStorage.getItem("Nickname"));
      for(let i = 0;i < conversations.length;i++){
        if(conversations[i].Nickname == Nickname){
          return conversations[i].messages;
        }
      }
    }
    return null;
  }
  public getFollowers(Nickname):any{
    return JSON.parse(localStorage.getItem(Nickname+':followers'));
  }
  public searchConversations(Text):any{
    let conversations = this.getConversations(sessionStorage.getItem("Nickname"));
    let persons = this.search(Text,'friend',sessionStorage.getItem("Nickname"));
    if(persons==null||persons.length==0){
      persons = this.search(Text,'searchConversations',sessionStorage.getItem("Nickname"));
      if(persons==null)
        return null;
    }
    let result = [];
    if(conversations!=null) {
      for (let i = 0; i < conversations.length; i++) {
        if (persons.indexOf(conversations[i].Nickname) != -1) {
          result = result.concat(conversations[i]);
        }
      }
    }
    if(result.length!=0) {
      return result;
    }
    else {
      for(let i = 0;i<persons.length;i++) {
        let conv = new conversation();
        conv.Nickname = persons[i];
        conv.messages = [];
        conv.Count = 0;
        result = result.concat(conv);
      }
      return result;
    }
  }
  public getCountOfInvites():any{
    let invites = this.getAllInvites(sessionStorage.getItem("Nickname"));
    if(invites==null)
      return 0;
    return invites.length;
  }
  public getCountOfNewMessages():any{
    let conversations = this.getConversations(sessionStorage.getItem("Nickname"));
    if( conversations==null)
      return 0;
    let result = 0;
    for(let i = 0;i<conversations.length;i++){
       if(conversations[i].Count!=0)
         result++;
    }
    return result;
  }
  public getStorageMessages():any{
    return JSON.parse(localStorage.getItem(this.getMainPerson().Nickname+":storage"));
  }
  public setStorageMessages(messages):void{
    localStorage.setItem(this.getMainPerson().Nickname+":storage",JSON.stringify(messages));
  }
  public addStorageMessage(message):void{
    if(this.getStorageMessages()!=null)
      this.setStorageMessages(this.getStorageMessages().concat(message));
    else
      this.setStorageMessages([message]);
  }
}
