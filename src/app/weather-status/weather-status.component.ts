import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../config/constants';
import { Current, Daily, MainWeather } from '../interfaces/Weather/Weather';

@Component({
  selector: 'app-weather-status',
  templateUrl: './weather-status.component.html',
  styleUrls: ['./weather-status.component.css']
})
export class WeatherStatusComponent implements OnInit {

  weather!: MainWeather
  currentWeather!: Current;
  dailyWeather!: Daily[];
  imagePath: string ='';

  dailyImagePaths: string[] = [];
  dayNames: string[] = [];
  // currentWeather = this.weather.current;
  // dailyWeather = this.weather.daily;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

     this.getWeather().subscribe((result) =>
    {
      this.weather = result;
  
      this.currentWeather = this.weather.current;
      this.dailyWeather = this.weather.daily;

      this.imagePath = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`;

      this.dailyWeather.forEach(item => {
        this.dailyImagePaths.push(`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`);
        this.dayNames.push(this.timeConverter(item.dt))
        
      })
   
      console.log(this.dailyImagePaths);
      console.log(this.dayNames);
    });
 
  }


  public getWeather() { 
 
    const stringUrl ="lat=49.917&lon=18.593&units=metric&lang=pl&appid=" + Constants.WEATHER_API_KEY;

    const options = { params: new HttpParams( {fromString: stringUrl}) };

    return this.http.get<MainWeather>("https://api.openweathermap.org/data/2.5/onecall", options);
        
    } 

    public timeConverter(timestamp: number){
      var a = new Date(timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var days = ['SUN','MON','TUS','WED','THU','FRI','SAT'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      
//First of month
      var day = days[a.getDay()];
      return day;
    }
}
