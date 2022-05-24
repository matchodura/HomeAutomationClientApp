import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddMqttComponent } from '../dialog-add-mqtt/dialog-add-mqtt.component';
import { MQTTDevice } from '../interfaces/Hardware/MQTTDevice';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor( public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
    

  removeMqttDevice(event: any){
    console.log('removing mqtt device');
  }

  async addNewMqttDevice(event: any) {
    console.log(event.target.getBoundingClientRect());
    let targetAttr = event.target.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;            

    dialogConfig.position = {
      top: '25vh',
      left: '25vw'
    };

    dialogConfig.width = '500px';
    dialogConfig.height = '500px';

    

    // let hardwareDevice = new HardwareDevice();
    // hardwareDevice = device;

    // dialogConfig.data = hardwareDevice;
    const dialogRef = this.dialog.open(DialogAddMqttComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(data => {
    //      this.hardwareStatusService.updateDevice(data);

    //      this.ngOnInit();
         
    // });

}
}
