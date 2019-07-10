import { Component, OnInit } from '@angular/core';
import { RegisteruserService } from '../registeruser.service';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavService } from '../nav.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = "";
  username = "";


  constructor(private router: Router,
    private regservice: RegisteruserService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private navService: NavService) {
    this.regservice.getUserName()
      .subscribe(
        data => this.user = data.toString(),
        error => this.router.navigate(['/login']),
      )


  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}