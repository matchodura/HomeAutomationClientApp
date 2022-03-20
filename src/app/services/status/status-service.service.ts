import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Constants } from 'src/app/config/constants';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  constructor(private http: HttpClient) { }

  public async getStatusOfDevice<SensorStatus>(sensor: string) { 

    const stringUrl ="sensorName="+ sensor;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return await this.http.get<SensorStatus>(Constants.STATUS_API_ENDPOINT, options).toPromise().then(res => {
      return res
    });
        
    } 
}
