import { Component, OnInit } from '@angular/core';
import { RegisteruserService } from '../registeruser.service';
import { Router } from '@angular/router';
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
    private navService: NavService) {
    this.regservice.getUserName()
      .subscribe(
        data => { this.user = data.toString(); localStorage.setItem('username', data.toString());},
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
