import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisteruserService } from './registeruser.service';
//import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const socket = io('http://localhost:3006');

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connID: String;
  uname: String;
  sendUnameID: String;
  sentResp: any;
  private _http: HttpClient;
  private socket: SocketIOClient.Socket;
  reguser: RegisteruserService;

  constructor() {}

  socketConnect() {

    let observable = new Observable(observer => {
      this.uname = localStorage.getItem('username');
      socket.connect();
      socket.on('initConnect', function (data) {
        this.uname = localStorage.getItem('username')
        this.connID = data.toString();
        localStorage.setItem('connectionID', this.connID)
        console.log(this.connID,"the received connID")
        this.sendUnameID = this.uname + ';' + this.connID;
        console.log(this.sendUnameID,"the sent unameID")
        socket.emit('storeID', this.sendUnameID)
      })

      socket.on('data1', function (data) {
        observer.next(data);
      });


    })
    return observable;


    // console.log('inside');
    // this.uname = un;
    // console.log("b")
    // socket.connect();
    // console.log('Socket Connected')
    // socket.on('initConnect', function (res) {
    //   console.log('inside initConnect')
    //   this.connID = res;
    //   console.log(this.connID, this.uname)
    //   socket.emit('unameID', {conid: this.connID })
    //   console.log("Socket Connection Success!!!");
    //   socket.on('data1', function (res) {
    //     console.log(res)
    //     console.log(this.uname)
    //     console.log('data from service')
    //  })
    // });
  }


  socketDisconnect() {
    this.sendUnameID = this.uname + ';' + localStorage.getItem('connectionID')
    socket.emit('disconnectReq', this.sendUnameID);
    socket.disconnect();
    localStorage.removeItem('connectionID')
    console.log('Disconnected');
  }
}
