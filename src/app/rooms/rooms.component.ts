import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HomeControlService } from '../services/home-control/home-control.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Layout } from '../interfaces/Layout';
import { Room } from '../interfaces/Room';
import { RoomItem } from '../interfaces/RoomItem';
import { SwitchControlDTO } from '../interfaces/SwitchControlDTO';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';



export interface Layouts {
  id: number;
  name: string;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  encapsulation: ViewEncapsulation.None 
})

export class RoomsComponent implements OnInit {  
  layouts: Layouts[] = [];
  rooms: Room[] = [];
  cardRooms : Room[] = [];

  filteredRooms: Room[] = [];

  switches : RoomItem[]= [];
  roomSwitches : RoomItem[]= [];
  icon = faExclamationCircle;
  ids: any;
  svgData:any;

  level: number = 0;

  viewMode: boolean = true; //default layout

  constructor(private homeService: HomeControlService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getLayoutsNames();
    this.getRoomData();    
  }

  getLayouts(level: number){this.homeService.getLayouts<Layout>(level).subscribe((res: any) => {
      this.svgData = atob(res.image);
    });
  }

  getRoomData(){this.homeService.getAllRooms<Room[]>().subscribe((res: any) => {   
    this.rooms = res;    
   });
  }
  
  getLayoutsNames(){this.homeService.getLayoutNames().subscribe((res: any) => {
    this.layouts = res;
    });
  }



  populateRoomData(){
    const svgns = "http://www.w3.org/2000/svg";

    this.switches = [];

    this.filteredRooms = this.rooms.filter(x=>x.level == this.level);
    
    this.filteredRooms.forEach((item) => {
      var roomRectangle = document.getElementById(item.frontendID);
      
      let xDimensionOfParent = roomRectangle?.getAttribute('x');
      let yDimensionOfParent = roomRectangle?.getAttribute('y');
  
      let dataX = Number(xDimensionOfParent) + 50;
      let dataY = Number(yDimensionOfParent) + 25;
  
      let textDataX = Number(dataX) + 20;
      let textDataY = Number(dataY) + 25;

      const dataRectangle = document.createElementNS(svgns, 'rect');      
      dataRectangle.setAttribute("style", 'fill:white;stroke-width:3;stroke:rgb(0,0,0)')  
      dataRectangle.setAttribute("width", '350')
      dataRectangle.setAttribute("height", '150')    
      dataRectangle.setAttribute("x", dataX.toString() )
      dataRectangle.setAttribute("y", dataY.toString() )
      roomRectangle?.after(dataRectangle)
     

      const textData = document.createElementNS(svgns, "text");
      textData.setAttribute("style", 'fill:black;')  
      textData.setAttribute("width", '200')
      textData.setAttribute("height", '100')    
      textData.setAttribute("font-family", "Verdana")
      textData.setAttribute("font-size", "14")   
      textData.setAttribute("x", textDataX.toString() )
      textData.setAttribute("y", textDataY.toString() )
      textData.innerHTML = "Room name: " + item.name;
      dataRectangle?.after(textData);

      const temperatureData = document.createElementNS(svgns, "text");
      temperatureData.setAttribute("style", 'fill:black;')  
      temperatureData.setAttribute("width", '200')
      temperatureData.setAttribute("height", '100')    
      temperatureData.setAttribute("font-family", "Verdana")
      temperatureData.setAttribute("font-size", "14")   
      temperatureData.setAttribute("x", (textDataX).toString() )
      temperatureData.setAttribute("y", (textDataY + 20).toString() )
      temperatureData.innerHTML = "Temperature: " + item.roomValue?.temperature.toString()
      textData?.after(temperatureData);

      const humidityData = document.createElementNS(svgns, "text");
      humidityData.setAttribute("style", 'fill:black;')  
      humidityData.setAttribute("width", '200')
      humidityData.setAttribute("height", '100')    
      humidityData.setAttribute("font-family", "Verdana")
      humidityData.setAttribute("font-size", "14")   
      humidityData.setAttribute("x", (textDataX).toString() )
      humidityData.setAttribute("y", (textDataY + 40).toString() )
      humidityData.innerHTML = "Humidity: " + item.roomValue?.humidity.toString()
      temperatureData?.after(humidityData);

      const topicData = document.createElementNS(svgns, "text");
      topicData.setAttribute("style", 'fill:black;')  
      topicData.setAttribute("width", '200')
      topicData.setAttribute("height", '100')    
      topicData.setAttribute("font-family", "Verdana")
      topicData.setAttribute("font-size", "14")   
      topicData.setAttribute("x", (textDataX).toString() )
      topicData.setAttribute("y", (textDataY + 60).toString() )
      topicData.innerHTML = "Topic: " + item.roomValue?.topic.toString()
      humidityData?.after(topicData);

      const lastPolled = document.createElementNS(svgns, "text");
      lastPolled.setAttribute("style", 'fill:black;')  
      lastPolled.setAttribute("width", '200')
      lastPolled.setAttribute("height", '100')    
      lastPolled.setAttribute("font-family", "Verdana")
      lastPolled.setAttribute("font-size", "14")   
      lastPolled.setAttribute("x", (textDataX).toString() )
      lastPolled.setAttribute("y", (textDataY + 80).toString() )
      lastPolled.innerHTML = "LastPolled: " + item.roomValue?.lastModified.toString()
      topicData?.after(lastPolled);

      const aliveDevices = document.createElementNS(svgns, "text");
      aliveDevices.setAttribute("style", 'fill:black;')  
      aliveDevices.setAttribute("width", '200')
      aliveDevices.setAttribute("height", '100')    
      aliveDevices.setAttribute("font-family", "Verdana")
      aliveDevices.setAttribute("font-size", "14")   
      aliveDevices.setAttribute("x", (textDataX).toString() )
      aliveDevices.setAttribute("y", (textDataY + 100).toString() )
      aliveDevices.innerHTML = "Alive Devices: " + item?.aliveDevicesCount.toString()
      lastPolled?.after(aliveDevices);


    //find all rooms which have configured items/devices
    let allSwitches = item.roomItem.filter(x => x.deviceType === 1);
    console.log(allSwitches);


     if(allSwitches.length> 0){
       this.switches = allSwitches;
       let rect = aliveDevices.getBoundingClientRect();

       this.switches.forEach(function(roomItem){
        if(rect.x != 0){
          let switchToModify = document.getElementById("switch_"+ roomItem.name)    
          switchToModify!.style.position = "absolute"
          switchToModify!.style.left = rect.x+'px';
          switchToModify!.style.top = rect.y+'px';
          switchToModify!.style.zIndex = "2";

     
        }       
    })

  }  
  })
  
  }

  populateCardRoomData(){
    this.cardRooms = this.rooms.filter(x=>x.level == this.level);
    this.cardRooms.sort((a,b)=> Number(a.frontendID.slice(a.frontendID.length - 1))  - Number(b.frontendID.slice(b.frontendID.length - 1)));  
  }



  onValChange(value: any){
    this.level = value;
    this.getLayouts(value);
    this.populateRoomData();
    this.populateCardRoomData();
  }


  setViewMode(value: any){

    if(value === "card"){
      this.viewMode = false;
    }
    else{
      this.viewMode = true;
    }
    console.log("current view mode:", this.viewMode)
  }



  controlSwitch(value: any, device: any){

    const control = new SwitchControlDTO();
    
    if(value.checked === true){

      control.command = "ON"
    }
    else{
      control.command = "OFF"
    }

    control.deviceName = device.name;


    this.homeService.controlSwitch(control).subscribe((res: any) => {
     
    });
  }
}
