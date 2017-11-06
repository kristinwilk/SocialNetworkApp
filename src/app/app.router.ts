import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NewsComponent } from "./news/news.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import {RegistrationFormComponent} from "./registration-page/registration-form/registration-form.component";
import {SignInFormComponent} from "./registration-page/sign-in-form/sign-in-form.component";

export const router : Routes = [
  {path:'registration',component:RegistrationFormComponent},
  {path:'signIn',component:SignInFormComponent},
  {path:'',redirectTo:'timeTO',pathMatch:'full'},
  ];
export const routes: ModuleWithProviders = RouterModule.forRoot(router);
