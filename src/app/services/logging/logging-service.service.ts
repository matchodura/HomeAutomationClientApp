import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Constants } from 'src/app/config/constants';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoggingServiceService {

  constructor(private http: HttpClient) { }
  
  timeFrom = '1968-11-16';
  timeTo = '2022-03-01';
 
  public getLoggingDeviceList() { 
   
    return this.http.get(Constants.LOGGING_API_ENDPOINT + 'devices'); 
    } 

  public getLoggingDeviceValues<SensorData>(sensor: string) { 

    const stringUrl ="sensorName="+ sensor +"&TimeFrom=" + this.timeFrom + "&TimeTo=" + this.timeTo;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return this.http.get<SensorData>(Constants.LOGGING_API_ENDPOINT + 'values', options);
        
    } 
}
