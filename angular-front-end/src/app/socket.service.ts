import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisteruserService } from './registeruser.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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
  reguser: RegisteruserService;

  constructor() {
    

  }

  socketConnect() {

    let observable = new Observable( observer => {
      socket.connect();
      socket.on('data1', function( data) {
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
    socket.disconnect();
    console.log('Disconnected');
  }
}
