import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NvbarComponent } from './nvbar/nvbar.component';
import { DashboardComponent } from './nvbar/dashboard/dashboard.component';
import { LocationsComponent } from './nvbar/locations/locations.component';
import { UsersComponent } from './nvbar/users/users.component';
import { AuthLandComponent} from './../app/auth-land/auth-land.component';
import { AuthRegisterComponent } from './../app/auth-register/auth-register.component';
import { AuthGuard } from './shared/auth-guard.service';
import { GroupingComponent } from './nvbar/grouping/grouping.component';
import { ReportsComponent } from './nvbar/reports/reports.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
   {path: 'auth/line-landing', component: AuthLandComponent},
  { path: 'auth/register', component: AuthRegisterComponent},
  { path: 'admin',  component: NvbarComponent, children: [
  { path: 'lockers', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupingComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
//  { path: 'manageuser', component: ManageuserComponent, canActivate: [AuthGuard] }
  ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
