import { Component, OnInit } from '@angular/core';
import { RegisteruserService } from '../registeruser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = "";
  username = "";

  constructor( private router: Router,
    private regservice: RegisteruserService) { 
      this.regservice.getUserName()
    .subscribe(
      data => this.user= data.toString(),
      error => this.router.navigate(['/login']),
    )
    }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  properReturnedData(val1, val2) {
    this.user = val1.toString();
    this.username = val2.toString();
  }

}
