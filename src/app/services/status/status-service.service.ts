import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Constants } from 'src/app/config/constants';
import { HttpParams } from "@angular/common/http";
import { map, catchError, repeatWhen } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  constructor(private http: HttpClient) { }

  healthCheckAPI = Constants.STATUS_API_HEALTH;


  public async getStatusOfDevice<SensorStatus>(sensor: string) { 

    const stringUrl ="sensorName="+ sensor;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return await this.http.get<SensorStatus>(Constants.STATUS_API_ENDPOINT, options).toPromise().then(res => {
      return res
    });        
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
