import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { OpenAccountComponent } from './open-account/open-account.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'show-user', component: ShowUserComponent },
  { path: 'open-account', component: OpenAccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
