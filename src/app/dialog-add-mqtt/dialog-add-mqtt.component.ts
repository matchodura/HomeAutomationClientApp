import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MQTTDevice } from '../interfaces/Hardware/MQTTDevice';
import { ScannedDeviceDTO } from '../interfaces/Hardware/ScannedDeviceDTO';
import { HardwareStatusService } from '../services/hardware-status/hardwarestatus.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { StatusServiceService } from '../services/status/status-service.service';
import { DeviceType } from '../enums/DeviceType';

@Component({
  selector: 'app-dialog-add-mqtt',
  templateUrl: './dialog-add-mqtt.component.html',
  styleUrls: ['./dialog-add-mqtt.component.css']
})
export class DialogAddMqttComponent implements OnInit {
  loading = false;
  foundDevices: ScannedDeviceDTO[] = [];
  addIcon = faPlus;

  addDevice = false;
  deviceToAdd: MQTTDevice = new MQTTDevice();
  foundDevice: ScannedDeviceDTO = new ScannedDeviceDTO();


  keys: any[] = [];
  types = DeviceType;

  selectedTypeOfDevice:number = 10;

  constructor(@Inject(MAT_DIALOG_DATA) public device: MQTTDevice, public dialog: MatDialogRef<DialogAddMqttComponent>,
   private hardwareStatusService: HardwareStatusService, private statusService: StatusServiceService){
    this.keys = Object.keys(this.types).filter(Number);
   }

  ngOnInit(): void {
  }

  findNewDevices(event: any){
    this.loading = true
    this.hardwareStatusService.findNewDevices().subscribe((result: any) =>
    {
      if(result){
        this.foundDevices = result;
        console.log('found devices:', this.foundDevices);
        this.loading = false;
      }
    },
    error => {
      console.log("completed! but errored")
        this.loading = false;
    });
    }

    addNewDevice(event:any, device: ScannedDeviceDTO){

      this.addDevice = true;
      this.foundDevice = device;
      console.log(this.foundDevice)
    }

    saveDevice(event:any){
    

      this.deviceToAdd.IP = this.foundDevice.ip;
      this.deviceToAdd.MAC = this.foundDevice.mac;
      this.deviceToAdd.hostName = this.foundDevice.hostName;
      this.deviceToAdd.deviceType = this.selectedTypeOfDevice;

      console.log("saving new device", this.deviceToAdd)
      this.statusService.addMqttDevice(this.deviceToAdd);
    

      this.addDevice = false;
    }


    doSomething(selectedType: number) {  
      this.selectedTypeOfDevice = selectedType;
    }

}
