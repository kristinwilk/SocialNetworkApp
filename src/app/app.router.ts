import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./network/list/list.component";
import { MainPageComponent } from "./network/main-page/main-page.component";
import { NewsComponent } from "./network/news/news.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import {RegistrationFormComponent} from "./registration-page/registration-form/registration-form.component";
import {SignInFormComponent} from "./registration-page/sign-in-form/sign-in-form.component";
import {NetworkComponent} from "./network/network.component";

export const router : Routes = [
  {path:'',redirectTo:'timeTO',pathMatch:'full'},
  {path:'timeTO',component:NetworkComponent},
  {path:'registration',component:RegistrationFormComponent},
  {path:'signIn',component:SignInFormComponent}
  ];
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
