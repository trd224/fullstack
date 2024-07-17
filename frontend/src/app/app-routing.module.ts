import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './_components/page404/page404.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { SignupComponent } from './_pages/signup/signup.component';
import { AboutComponent } from './_pages/about/about.component';
import { DirectiveExampleComponent } from './_pages/directive-example/directive-example.component';
import { CustomPipeComponent } from './_pages/custom-pipe/custom-pipe.component';
import { LoginComponent } from './_pages/login/login.component';

const routes: Routes = [
  {path:"", redirectTo: "dashboard", pathMatch:"full"},
  // {path: "dashboard", loadComponent: () => import("./_pages/dashboard/dashboard.component").then(c => c.DashboardComponent)},
  {path: "dashboard", component: DashboardComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "about", component: AboutComponent},
  {path: "directive", component: DirectiveExampleComponent},
  {path: "custom-pipe", component: CustomPipeComponent},
  {path:"users", loadChildren: () => import("./_modules/user/user.module").then(m => m.UserModule)},
  {path:"page-not-found", component: Page404Component},
  {path:"**", redirectTo: "page-not-found", }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
