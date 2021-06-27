import { Injectable } from "@angular/core";
import {Observable, Observer, Subject} from "rxjs";
// @ts-ignore
import * as io from "socket.io-client";

@Injectable()
export class WebsocketService {
  socket: any;
  kerp:string = "";
  readonly url: string = "http://localhost:3000"

  constructor() {
    this.socket = io(this.url, {transports: ['websocket'] });
  }

  listen(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data: any) =>{
        subscriber.next(data)
      })
      });
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);
  }
}
