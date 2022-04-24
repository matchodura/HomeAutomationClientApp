import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signal-r/signal-r.service';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SensorStatus } from '../interfaces/SensorStatus';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http: HttpClient, private toastr: ToastrService) {
    
   }

  okMarkPath = './assets/icons/check_mark.png';
  nokMarkPath = './assets/icons/x_mark.png';
  unknownMarkPath = './assets/icons/unknown.png';
  devices: SensorStatus[] = [];


  dataSource = new MatTableDataSource<any>();  
 
  displayedColumns: string[] = ['name', 'topic', 'ip', 'status','lastCheck', 'lastAlive', 'uptimeInSeconds', 'moreInfo'];

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addStatusServiceListener();
    this.signalRService.signalReceived.subscribe(res => {     
      this.devices = res;        
      this.dataSource.data = res;     
      // this.toastr.success("dupa dupa, signalr updejt");     
      // this.toastr.error("dupa dupa, signalr updejt");     
    });  
  }
     
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}

