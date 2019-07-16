import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { NgxMasonryOptions } from 'ngx-masonry';

const socket = io('http://localhost:3006');

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  socket: SocketIOClient.Socket;
  masonryItems = [
    { title: 'Node 1' },
    { title: 'Node 2' },
    { title: 'Node 3' },
    { title: 'Node 4' },
    { title: 'Node 5' },
    { title: 'Node 6' },
    { title: 'Node 7' },
    { title: 'Node 8' },
    { title: 'Node 9' },
    { title: 'Node 10' },
    { title: 'Node 11' },
    { title: 'Node 12' },
    { title: 'Node 13' },
    { title: 'Node 14' },
    { title: 'Node 15' },
    { title: 'Node 16' },
    { title: 'Node 17' },
    { title: 'Node 18' },
    { title: 'Node 19' },
    { title: 'Node 20' },
    { title: 'Node 21' },
    { title: 'Node 22' },
    { title: 'Node 23' },
    { title: 'Node 24' }
  ];

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    originLeft: true,
    fitWidth: true,
    columnWidth: 200,
    initLayout: true,
    //fitHeight: true
  };

  constructor() {
  }

  ngOnInit() {

    socket.on('data1', (res) => {
      console.log(res);
      console.log("Success!!!");
    })

  }

}
