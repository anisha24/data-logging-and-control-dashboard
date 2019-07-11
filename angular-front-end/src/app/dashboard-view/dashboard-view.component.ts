import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  gaugeType = "arch";
  gaugeValue = 28.3;
  gaugeLabel = "temp";
  gaugeAppendText = "deg";

  constructor() { }

  ngOnInit() {
  }

}
