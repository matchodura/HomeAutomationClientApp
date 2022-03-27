import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signal-r/signal-r.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http: HttpClient) { }

  okMarkPath = './assets/icons/check_mark.png';
  nokMarkPath = './assets/icons/x_mark.png';
  unknownMarkPath = './assets/icons/unknown.png';
  
  dataSource = new MatTableDataSource<any>();  
 
  displayedColumns: string[] = ['name', 'topic', 'ip', 'status','lastAlive','uptimeInSeconds', 'moreInfo'];

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addStatusServiceListener();
    this.signalRService.signalReceived.subscribe(res => {             
      this.dataSource.data = res;     
    });  
  }
     
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
