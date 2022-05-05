import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HardwareDevice, HardwareType } from '../interfaces/Hardware/HardwareDevice';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-dialog-editing',
  templateUrl: './dialog-editing.component.html',
  styleUrls: ['./dialog-editing.component.css']
})
export class DialogEditingComponent implements OnInit {


  keys: any[] = [];
  types = HardwareType;

  selectedTypeOfDevice:number = 10;
  newNameOfDevice: string="";

  constructor(@Inject(MAT_DIALOG_DATA) public device: HardwareDevice, public dialog: MatDialogRef<DialogEditingComponent>,) {

    this.keys = Object.keys(this.types).filter(Number);

  }

  ngOnInit(): void {

    
  }


  saveDevice(event: Event, device: HardwareDevice) {
    console.log("edited device here", device)
    
    device.hardwareType = Number(this.selectedTypeOfDevice);
    if(this.newNameOfDevice !== ""){
      device.name = this.newNameOfDevice;
    }
    else{
      device.name = device.hostName;
    }
  
    this.dialog.close(device);
  }

  doSomething(selectedType: number) {
    console.log("edited device here id", selectedType)
    this.selectedTypeOfDevice = selectedType;
  }

}


