import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule, MatIconModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { RegisteruserService } from './registeruser.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { RegSuccessDialogComponent } from './reg-success-dialog/reg-success-dialog.component';
import { RegFailureDialogComponent } from './reg-failure-dialog/reg-failure-dialog.component';
import { LoginBannerComponent } from './login-banner/login-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    RegSuccessDialogComponent,
    RegFailureDialogComponent,
    LoginBannerComponent,  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule
  ],
 
  entryComponents:[ RegSuccessDialogComponent, RegFailureDialogComponent],
  providers: [ RegisteruserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
