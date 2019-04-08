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
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { NotificationsComponent } from './nvbar/dashboard/notifications/notifications.component';
import { LocationsComponent } from './nvbar/locations/locations.component';
import { LocationsCrudComponent } from './nvbar/locations/locations-crud/locations-crud.component';
import { LockerService } from './shared/locker.service';
import { LocationService } from './shared/location.service';
import { LocationServerService } from './shared/location.server.service';
import { HttpClientModule } from '@angular/common/http';
import { LockerServerService } from './shared/locker.server.service';
import { AuthServerService } from './shared/auth.server.service';
import { AuthLandComponent } from './auth-land/auth-land.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthGuard } from './shared/auth-guard.service';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NvbarComponent,
    DashboardComponent,
    UsersComponent,
    LockersComponent,
    NotificationsComponent,
    LocationsComponent,
    LocationsCrudComponent,
    AuthLandComponent,
    AuthRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [LocationService, LockerService, LocationServerService, LockerServerService, AuthServerService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
