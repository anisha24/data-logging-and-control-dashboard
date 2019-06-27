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
import { MatSnackBarModule}  from '@angular/material/snack-bar';
import { LoginBannerComponent } from './login-banner/login-banner.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';

import { RegisteruserService } from './registeruser.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    LoginBannerComponent,
    LoginFooterComponent
    
    
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
    MatSnackBarModule,
    MatIconModule,
    HttpClientModule
  ],
 

  providers: [ RegisteruserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
