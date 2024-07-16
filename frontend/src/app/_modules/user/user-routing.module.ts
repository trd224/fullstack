import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './_pages/user/user.component';
import { DetailComponent } from './_pages/detail/detail.component';

const routes: Routes = [
  {path:"", component: UserComponent,},
  {path:":id", component: DetailComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
