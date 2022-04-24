import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import { HardwareStatusSignalRService } from '../services/signal-r/hardware-status-signal-r.service';


@Component({
  selector: 'app-network-devices',
  templateUrl: './network-devices.component.html',
  styleUrls: ['./network-devices.component.css']
})
export class NetworkDevicesComponent implements OnInit {

  constructor(public signalRService: HardwareStatusSignalRService, private http: HttpClientModule) {    
  }

 okMarkPath = './assets/icons/check_mark.png';
 nokMarkPath = './assets/icons/x_mark.png';
 unknownMarkPath = './assets/icons/unknown.png';
  devices: any[] = [];


 dataSource = new MatTableDataSource<any>();  

 displayedColumns: string[] = ['name', 'type', 'hostname', 'ip', 'mac','dateadded', 'lastcheck', 'devicestatus'];

 ngOnInit() {
   this.signalRService.startConnection();
   this.signalRService.addStatusServiceListener();
   this.signalRService.signalReceived.subscribe(res => {     
     this.devices = res;        
     this.dataSource.data = res;    
     console.log(this.dataSource.data)  
   });  
 }
 
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}




