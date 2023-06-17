import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { OpenAccountComponent } from './open-account/open-account.component';
import { AllUsersComponent } from './all-users/all-users.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ShowUserComponent,
    OpenAccountComponent,
    AllUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
