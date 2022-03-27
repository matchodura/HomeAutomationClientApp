import { Component, OnInit } from '@angular/core';
import { Constants } from '../config/constants';
import { ServiceStatus } from '../interfaces/ServiceStatus';
import { StatusServiceService } from '../services/status/status-service.service';
import { map, tap, catchError, retryWhen, delay } from 'rxjs/operators';
import { LoggingServiceService } from '../services/logging/logging-service.service';


@Component({
  selector: 'app-services-status',
  templateUrl: './services-status.component.html',
  styleUrls: ['./services-status.component.css']
})
export class ServicesStatusComponent implements OnInit {

  okMarkPath = './assets/icons/check_mark.png';
  nokMarkPath = './assets/icons/x_mark.png';
  seqIcon = './assets/icons/seq_image.jpg';
  seqUrl = Constants.SEQ_URL;

  

  services: ServiceStatus[]=  [{
    name: "status-api"    ,
    url: "https://localhost:7053/health",
    seqName: "status-api",
    healthCheckIcon: this.nokMarkPath
  },
  {
    name: "logging-api",
    url: "https://localhost:5001/health",
    seqName: "logging-api",
    healthCheckIcon: this.nokMarkPath
  }]
  
  constructor(private statusServce: StatusServiceService, private loggingService: LoggingServiceService) { }

  ngOnInit(): void {

    this.statusServce.healthCheck().pipe(
      tap(
        (data) => {      
          this.services[0].healthCheckIcon = this.okMarkPath;
        },
        (error) => {         
          this.services[0].healthCheckIcon = this.nokMarkPath;
        }
      ),
      retryWhen(errors => errors.pipe(delay(5000)))
    ).subscribe();

    this.loggingService.healthCheck().pipe(
      tap(
        (data) => {      
          this.services[1].healthCheckIcon = this.okMarkPath;
        },
        (error) => {         
          this.services[1].healthCheckIcon = this.nokMarkPath;
        }
      ),
      retryWhen(errors => errors.pipe(delay(5000)))
    ).subscribe();

  }

}
