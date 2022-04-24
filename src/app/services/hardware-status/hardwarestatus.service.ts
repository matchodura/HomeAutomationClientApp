import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';
import { interval } from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HardwareStatusService {

  healthCheckAPI = Constants.HARDWARE_STATUS_API_HEALTH;
  
  constructor(private http: HttpClient) { }


  



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
