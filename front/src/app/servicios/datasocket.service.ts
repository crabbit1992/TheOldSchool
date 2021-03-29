import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse }from '@angular/common/http'
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasocketService {

  constructor( private http: HttpClient ) { }

  /*********************** Eventos de socket ******************************************* */
  private socket = io('http://localhost:3000');


  joinRoom(data) {
    this.socket.emit('join', data);
  }
  newUserJoined() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
  leaveRoom(data) {
    this.socket.emit('leave', data);
  }
  userLeftRoom() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  sendMessage(data) {
    console.log("se envio un mensaje");
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    const observable = new Observable<{user: string, message: string, time: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
  typing(data) {
    this.socket.emit('typing', data);
  }
  userTyping() {
    const observable = new Observable<{user: string, message: string}>(observer => {
      this.socket.on('user typing', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  allChat() {
    const observable = new Observable<any>(observer => {
      this.socket.on('chat history', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }

  // New user online
  newUser(data) {
    this.socket.emit('new user', data);
  }
  allOnlineUsers() {
    const observable = new Observable<any>(observer => {
      this.socket.on('usernames', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();
      };
    });
    return observable;
  }
}
