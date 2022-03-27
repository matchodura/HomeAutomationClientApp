import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Constants } from 'src/app/config/constants';
import {HttpParams} from "@angular/common/http";
import { map, catchError, repeatWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingServiceService {

  constructor(private http: HttpClient) { }
  
  timeFrom = '1968-11-16';
  timeTo = '2022-03-01';
 
  healthCheckAPI = Constants.LOGGING_API_HEALTH;

  public getLoggingDeviceList() { 
   
    return this.http.get(Constants.LOGGING_API_ENDPOINT + 'devices'); 
    } 

  public getLoggingDeviceValues<SensorData>(sensor: string) { 

    const stringUrl ="sensorName="+ sensor +"&TimeFrom=" + this.timeFrom + "&TimeTo=" + this.timeTo;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return this.http.get<SensorData>(Constants.LOGGING_API_ENDPOINT + 'values', options);
        
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
