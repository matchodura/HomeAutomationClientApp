import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { SensorStatus } from 'src/app/interfaces/SensorStatus';
import { Constants } from 'src/app/config/constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: SensorStatus[] = [];

  hubConnection!: signalR.HubConnection;
  private source = new BehaviorSubject(this.data);
  signalReceived = this.source.asObservable();

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(Constants.STATUS_SIGNALR_ENDPOINT + "status-hub")
                              .build();

    this.hubConnection.start().then(() => console.log('Connection started'))
    .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addStatusServiceListener = () => {
    this.hubConnection.on('status-data', (data) => {
      this.source.next(data);          
    });
  }

  constructor() { }
}
