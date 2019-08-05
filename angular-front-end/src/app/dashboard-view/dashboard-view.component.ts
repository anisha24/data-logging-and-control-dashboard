import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { NgxMasonryOptions } from 'ngx-masonry';
import { SocketService } from '../socket.service';
import { RegisteruserService } from '../registeruser.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { ConfigureComponent } from '../configure/configure.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//const socket = io('http://localhost:3006');

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  providers: [SocketService]
})
export class DashboardViewComponent implements OnInit {
  socket: SocketIOClient.Socket;
  masonryItems = [];
  socData = []

  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    originLeft: true,
    fitWidth: true,
    columnWidth: 300,
    initLayout: true,
    horizontalOrder: true,
    transitionDuration: '0.00s'
    //fitHeight: true
  };

  searchText;

  uname = '';
  // conid = '';
  connection

  constructor(private socketser: SocketService,
    private reguser: RegisteruserService,
    public dialog: MatDialog) {
      console.log('Executed')
  }

  ngOnInit() {

    console.log('created');
    //this.socketser.getData();
    //this.masonryItems = []

    this.uname = localStorage.getItem('username');
    this.connection = this.socketser.socketConnect().subscribe(socketData => {
      while (this.masonryItems.length !== 0) {
        this.masonryItems.pop();
      }
      console.log(this.masonryItems, 'Initial Socket entry')
      this.socData = [socketData];
      console.log(socketData)
      console.log(this.socData)
      console.log(this.socData[0].length, 'length')
      var i = this.socData[0].length - 1
      console.log(this.socData[0][2], 'Inside data')
      //this.masonryItems=[]
      for (var j = 0; j < i; j++) {
        this.masonryItems.push(this.socData[0][j])
      }
      console.log(this.masonryItems, 'Final Socket entry')
      while (this.socData.length !== 0) {
        this.socData.pop();
      }

      console.log(this.uname, "inside init")
    })


    //this.socketser.socketConnect(this.uname);
    console.log(this.socData)

  }


  openConfig(nodeID: String): void {


    console.log(nodeID, "this one always")
    let dialogRef = this.dialog.open(ConfigureComponent, {
      data: { NodeIDdata: nodeID }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });


  }


  ngOnDestroy() {
    console.log('Destroyed');
    this.socketser.socketDisconnect();
  }



}
