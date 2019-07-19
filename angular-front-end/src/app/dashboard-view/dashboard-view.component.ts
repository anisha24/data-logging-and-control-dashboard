import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { NgxMasonryOptions } from 'ngx-masonry';
import { SocketService } from '../socket.service';
import { RegisteruserService } from '../registeruser.service';

//const socket = io('http://localhost:3006');

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  socket: SocketIOClient.Socket;
  masonryItems = [];
  socData=[]

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    originLeft: true,
    fitWidth: true,
    columnWidth: 200,
    initLayout: true,
    //fitHeight: true
  };

  uname = '';
  // conid = '';
  connection

  constructor(private socketser: SocketService,
    private reguser: RegisteruserService) {
    console.log('Executed')

  }

  ngOnInit() {

    console.log('created');
    //this.socketser.getData();

    this.reguser.getUserName().subscribe(
      data => { this.uname = data.toString(); console.log(data, "con1"); console.log(this.uname, "con2"); },
      err => { }
    );

    this.connection = this.socketser.socketConnect().subscribe(socketData => {
      this.socData.push(socketData);
      console.log(this.socData)
    console.log(this.uname, "inside init")
    })

    //this.socketser.socketConnect(this.uname);

    console.log(this.socData)

  }

  ngOnDestroy() {
    console.log('Destroyed');
    this.socketser.socketDisconnect();
  }



}
