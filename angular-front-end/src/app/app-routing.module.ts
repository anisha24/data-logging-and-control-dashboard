import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfgaccountComponent } from './confgaccount/confgaccount.component';
import { VisualisationComponent } from './visualisation/visualisation.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'register', component: RegisterComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'config', component: ConfgaccountComponent},
{ path: 'visual', component: VisualisationComponent},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
