import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpParams } from '@angular/common/http';

const socket = io('http://localhost:3006');

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connID: String;
  uname: String;
  sentResp: any;
  private _http: HttpClient;
  private socket: SocketIOClient.Socket;

  constructor() {

  }

  getUserName() {
    return this._http.get('http://localhost:3000/users/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

  socketConnect() {
    console.log('inside');
    socket.on('initConnect', function (res) {
      this.connID = res;
      this.uname = this.getUserName;
      console.log(this.connID, this.uname)
      socket.emit('unameID', this.uname, this.connID)
      console.log("Socket Connection Success!!!");
      socket.on('data1', function (res) {
        console.log(res)
        console.log('data from service')
     })
    });
  }

  getData() {
    
    //return this.sentResp;
  }


  

  socketDisconnect() {
    socket.emit('wantToDisconnect', this.getUserName(), this.connID)
    socket.disconnect();
  }
}
