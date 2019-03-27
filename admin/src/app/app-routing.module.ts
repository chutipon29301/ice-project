import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NvbarComponent } from './nvbar/nvbar.component';
import { DashboardComponent } from './nvbar/dashboard/dashboard.component';
import { UsersComponent } from './nvbar/users/users.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
 { path: 'admin',  component: NvbarComponent, children: [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'users', component: UsersComponent},
//  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
//  { path: 'mapping', component: UpmappingComponent, canActivate: [AuthGuard] },
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
