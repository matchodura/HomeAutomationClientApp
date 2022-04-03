import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class HomeControlService {

  constructor(private http: HttpClient) { }

  healthCheckAPI = Constants.HOME_CONTROL_API_HEALTH;
  public getLayouts<Layout>(level: number) { 

    const stringUrl ="level="+ level;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return this.http.get<Layout>(Constants.HOME_CONTROL_API_ENDPOINT + 'layout', options);
        
    } 

    public getLayoutNames() {   
      return this.http.get(Constants.HOME_CONTROL_API_ENDPOINT + 'names');          
    } 



  public getAllRooms<Room>() {   
    return this.http.get<Room[]>(Constants.HOME_CONTROL_API_ENDPOINT + 'all');          
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
