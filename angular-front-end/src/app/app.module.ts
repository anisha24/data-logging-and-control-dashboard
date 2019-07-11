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
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatGridListModule, MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { RegisteruserService } from './registeruser.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { RegSuccessDialogComponent } from './reg-success-dialog/reg-success-dialog.component';
import { RegFailureDialogComponent } from './reg-failure-dialog/reg-failure-dialog.component';
import { LoginBannerComponent } from './login-banner/login-banner.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { ConfgaccountComponent } from './confgaccount/confgaccount.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgxGaugeModule } from 'ngx-gauge';
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
    DashboardViewComponent,
    VisualisationComponent,
    ConfgaccountComponent,
    
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
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    NgxGaugeModule,
    NgMasonryGridModule,
  ],
 
  entryComponents:[ RegSuccessDialogComponent, RegFailureDialogComponent],
  providers: [ RegisteruserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
