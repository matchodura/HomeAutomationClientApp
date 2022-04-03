import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SensorStatus } from '../interfaces/SensorStatus';
import { StatusServiceService } from '../services/status/status-service.service';


@Component({
  selector: 'app-dialog-logging',
  templateUrl: './dialog-logging.component.html',
  styleUrls: ['./dialog-logging.component.css']
})
export class DialogLoggingComponent {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: SensorStatus) {}
  constructor(@Inject(MAT_DIALOG_DATA) public sensorName: string, private statusService: StatusServiceService) {}
  okMarkPath = './assets/icons/check_mark.png';
  nokMarkPath = './assets/icons/x_mark.png';
  deviceAlive: boolean = false;
  imagePath: string = '';
  loading: boolean = true;
  sensorLoaded: boolean = true;

  sensorStatus: SensorStatus = {
    name: '',
    topic: '',
    ip: '',
    status: '',
    lastCheck: new Date(),
    lastAlive: new Date(),
    uptimeInSeconds: 0,
    wasOnline: false
  };

  
  async getSensorData(sensorName: string){
    await this.statusService.getStatusOfDevice<SensorStatus>(sensorName).then(res => {
      this.sensorStatus = res;
      this.sensorLoaded = true;
    })   
    .catch(error =>
      {
      this.sensorLoaded = false;
      console.log("DUPA");
    });   
  }

  async ngOnInit() {
    console.log(this.sensorName);
    await this.getSensorData(this.sensorName).then(() => this.loading = false);
    
    if(this.sensorLoaded == true){
      if(this.sensorStatus.status=="Alive"){
        this.deviceAlive = true;
        this.imagePath = this.okMarkPath;
      }
      else{
        this.deviceAlive = false;
        this.imagePath = this.nokMarkPath;
      }
    }
 
  }
}
