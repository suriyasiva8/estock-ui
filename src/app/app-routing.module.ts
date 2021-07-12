import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyRegComponent } from './core/company-reg/company-reg.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { CompanyHomeComponent } from './dashboard/company-home/company-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',component: LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'home',component:DashboardComponent
  },
  {
    path:'company/:companyCode', component:CompanyHomeComponent 
  },
  {
    path:'registration', component:CompanyRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
