import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';
import { authGuard } from 'src/app/_shared/_guards/auth.guard';

const routes: Routes = [
  {path:"", component: UserComponent, canActivate: [authGuard]},
  {path:":id", component: DetailComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
