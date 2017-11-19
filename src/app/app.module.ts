import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from "./app.router";
import { AppComponent } from './app.component';
import { ListComponent } from './network/list/list.component';
import { MainPageComponent } from './network/main-page/main-page.component';
import { NewsComponent } from './network/news/news.component';
import { PageInfoComponent } from './network/main-page/page-info/page-info.component';
import { NextNewsComponent } from './network/main-page/next-news/next-news.component';
import { TextInfoComponent } from './network/main-page/page-info/text-info/text-info.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SignInFormComponent } from './registration-page/sign-in-form/sign-in-form.component';
import { RegistrationFormComponent } from './registration-page/registration-form/registration-form.component';
import { NetworkComponent } from './network/network.component';
import { PostComponent } from './network/news/post/post.component';
import {AuthGuard} from "./app.guard";
import {MainServiceService} from "./main-service.service";
import { FriendComponent } from './network/friends-list/friend/friend.component';
import { FriendsListComponent } from './network/friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainPageComponent,
    NewsComponent,
    PageInfoComponent,
    NextNewsComponent,
    TextInfoComponent,
    RegistrationPageComponent,
    SignInFormComponent,
    RegistrationFormComponent,
    NetworkComponent,
    PostComponent,
    FriendComponent,
    FriendsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [AuthGuard,MainServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
