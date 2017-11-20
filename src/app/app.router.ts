import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./network/list/list.component";
import { MainPageComponent } from "./network/main-page/main-page.component";
import { NewsComponent } from "./network/news/news.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import {RegistrationFormComponent} from "./registration-page/registration-form/registration-form.component";
import {SignInFormComponent} from "./registration-page/sign-in-form/sign-in-form.component";
import {NetworkComponent} from "./network/network.component";
import {AuthGuard} from "./app.guard";
import {MainServiceService} from "./main-service.service";

export const router : Routes = [
  {path:'',redirectTo:'timeTO/',pathMatch:'full'},
  {path:'timeTO/:Nickname',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'timeTO',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'registration',component:RegistrationFormComponent},
  {path:'signIn',component:SignInFormComponent},
  {path:'storage',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'photos',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'settings',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'friends/:Nickname',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'messages',canActivate:[AuthGuard],component:NetworkComponent},
  {path:'news',canActivate:[AuthGuard],component:NetworkComponent},
  ];
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
