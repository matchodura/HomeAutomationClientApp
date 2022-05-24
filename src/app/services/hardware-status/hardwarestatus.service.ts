import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';
import { interval } from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { HardwareDevice } from 'src/app/interfaces/Hardware/HardwareDevice';

@Injectable({
  providedIn: 'root'
})
export class HardwareStatusService {

  healthCheckAPI = Constants.HARDWARE_STATUS_API_HEALTH;
  
  constructor(private http: HttpClient) { }


  public refreshAllDevicesInNetwork() { 
    return this.http.get<any>(Constants.HARDWARE_API_ENDPOINT + 'refresh-devices');        
  } 

  public updateDevice(device: HardwareDevice){

    const body = device;
    console.log("body to send", body);
    return this.http.put<any>(Constants.HARDWARE_API_ENDPOINT + 'update-device', body).subscribe();
  }

  public refreshDevice(device: HardwareDevice){

    const body = device;

    return this.http.post<any>(Constants.HARDWARE_API_ENDPOINT + 'refresh-device', body);
        
  }

  public getAllDevices() { 
    return this.http.get<any>(Constants.HARDWARE_API_ENDPOINT + 'all');        
  } 


  public findNewDevices(){
    return this.http.get<any>(Constants.HARDWARE_API_ENDPOINT + 'find-new-devices');      
  }


  healthCheck() {
    return this.http.get<any>(this.healthCheckAPI, {responseType: 'text' as 'json', observe: 'response'}).pipe(
      map((resp: any) => {
        if(resp.status !== 200){
          throw resp;
        }
        return resp.status;
      }),
      repeatWhen(() => interval(5000))
    );
  }
}
