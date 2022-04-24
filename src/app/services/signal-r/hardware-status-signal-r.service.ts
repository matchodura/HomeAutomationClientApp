import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library

import { Constants } from 'src/app/config/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HardwareStatusSignalRService {
  public data: any[] = [];

  hubConnection!: signalR.HubConnection;
  private source = new BehaviorSubject(this.data);
  signalReceived = this.source.asObservable();

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(Constants.HARDWARE_STATUS_SIGNALR_ENDPOINT + "hardware-status-hub")
                              .build();

    this.hubConnection.start().then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addStatusServiceListener = () => {
    this.hubConnection.on('hardware-status-data', (data) => {
      this.source.next(data);          
    });
  }

  constructor() { }
}
