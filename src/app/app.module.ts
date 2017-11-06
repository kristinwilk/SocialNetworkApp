import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NewsComponent } from './news/news.component';
import { PageInfoComponent } from './main-page/page-info/page-info.component';
import { NextNewsComponent } from './main-page/next-news/next-news.component';
import { TextInfoComponent } from './main-page/page-info/text-info/text-info.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SignInFormComponent } from './registration-page/sign-in-form/sign-in-form.component';
import { RegistrationFormComponent } from './registration-page/registration-form/registration-form.component';

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
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
