import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NvbarComponent } from './nvbar/nvbar.component';
import { DashboardComponent } from './nvbar/dashboard/dashboard.component';
import { UsersComponent } from './nvbar/users/users.component';
import { LockersComponent } from './nvbar/dashboard/lockers/lockers.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { NotificationsComponent } from './nvbar/dashboard/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NvbarComponent,
    DashboardComponent,
    UsersComponent,
    LockersComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
