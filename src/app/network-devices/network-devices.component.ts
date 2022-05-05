import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import { HardwareStatusSignalRService } from '../services/signal-r/hardware-status-signal-r.service';
import { HardwareStatusService } from '../services/hardware-status/hardwarestatus.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogEditingComponent } from '../dialog-editing/dialog-editing.component';
import { HardwareDevice, HardwareType } from '../interfaces/Hardware/HardwareDevice';
import { faTv, faDesktop, faMobile, faNetworkWired, faQuestion, faWifi, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-network-devices',
  templateUrl: './network-devices.component.html',
  styleUrls: ['./network-devices.component.css']
})
export class NetworkDevicesComponent implements OnInit {

  computerIcon = faDesktop;
  smartphoneIcon = faMobile;
  homeApplianceIcon = faTv;
  iotIcon = faWifi;
  networkingIcon = faNetworkWired;
  unknownIcon = faQuestion;

  constructor(public signalRService: HardwareStatusSignalRService, private http: HttpClientModule, private hardwareStatusService: HardwareStatusService,
    public dialog: MatDialog, ) {    
      
  
  }

 okMarkPath = './assets/icons/check_mark.png';
 nokMarkPath = './assets/icons/x_mark.png';
 unknownMarkPath = './assets/icons/unknown.png';
  devices: any[] = [];

 dataSource = new MatTableDataSource<any>();  

 displayedColumns: string[] = ['name', 'type', 'hostname', 'ip', 'mac','dateadded', 'lastcheck', 'devicestatus', 'actions'];

 iconList: any = [];

 ngOnInit() {
   this.hardwareStatusService.getAllDevices().subscribe(res => {     
    this.devices = res;        

    this.refreshIcons(res);  
    this.dataSource.data = res;        
  });  


   this.signalRService.startConnection();
   this.signalRService.addStatusServiceListener();
   this.signalRService.signalReceived.subscribe(res => {     
     this.devices = res;        
     this.dataSource.data = res;    
     console.log(this.dataSource.data)  
   });  
 }
 
public refreshIcons(data:any){
  let indexes = data.map((x: { hardwareType: any; })=>x.hardwareType);

    
    indexes.forEach( (element: any) => {
      let test = this.HardwareTypeIconMap.get(element);

      this.iconList.push(test)
      
  });
}

 public HardwareTypeIconMap = new Map<HardwareType, IconDefinition>([
  [HardwareType.Computer, this.computerIcon],
  [HardwareType.Smartphone, this.smartphoneIcon],
  [HardwareType.HomeAppliance, this.homeApplianceIcon],
  [HardwareType.IoT, this.iotIcon],
  [HardwareType.Networking, this.networkingIcon],
  [HardwareType.Unknown, this.unknownIcon]]

 )   



 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

loading = false;

totalScan(event: any){
  this.loading = true
  this.hardwareStatusService.refreshAllDevicesInNetwork().subscribe((res: any) =>
  {
    if(res){
      console.log("completed!")
      this.loading = false;
    }
  },
  error => {
    console.log("completed! but errored")
      this.loading = false;
  });
  }
  


  async editDevice(event: any, device: any) {
    console.log(event.target.getBoundingClientRect());
    let targetAttr = event.target.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;            

    dialogConfig.position = {
    top: targetAttr.y + targetAttr.height + 10 + "px",
    left: targetAttr.x - targetAttr.width - 20 + "px"
    };

    

    let hardwareDevice = new HardwareDevice();
    hardwareDevice = device;

    dialogConfig.data = hardwareDevice;
    const dialogRef = this.dialog.open(DialogEditingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
         this.hardwareStatusService.updateDevice(data);

         this.ngOnInit();
         
    });

}



}