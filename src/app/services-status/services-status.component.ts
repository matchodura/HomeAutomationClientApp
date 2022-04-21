import { Component, OnInit } from '@angular/core';
import { Constants } from '../config/constants';
import { ServiceStatus } from '../interfaces/ServiceStatus';
import { StatusServiceService } from '../services/status/status-service.service';
import { map, tap, catchError, retryWhen, delay } from 'rxjs/operators';
import { LoggingServiceService } from '../services/logging/logging-service.service';
import { HomeControlService } from '../services/home-control/home-control.service';
import { HardwareStatusService } from '../services/hardware-status/hardwarestatus.service';


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
  },
  {
    name: "homecontrol-api",
    url: "https://localhost:8053/health",
    seqName: "homecontrol-api",
    healthCheckIcon: this.nokMarkPath
  },
  {
    name: "hardware-status-api",
    url: "https://localhost:10001/health",
    seqName: "hardware-status-api",
    healthCheckIcon: this.nokMarkPath
  }
]
  
  constructor(private statusServce: StatusServiceService, private loggingService: LoggingServiceService, private homeControl: HomeControlService,
    private hardwareStatus: HardwareStatusService) { }

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

    this.homeControl.healthCheck().pipe(
      tap(
        (data) => {      
          this.services[2].healthCheckIcon = this.okMarkPath;
        },
        (error) => {         
          this.services[2].healthCheckIcon = this.nokMarkPath;
        }
      ),
      retryWhen(errors => errors.pipe(delay(5000)))
    ).subscribe();


    this.hardwareStatus.healthCheck().pipe(
      tap(
        (data) => {      
          this.services[3].healthCheckIcon = this.okMarkPath;
        },
        (error) => {         
          this.services[3].healthCheckIcon = this.nokMarkPath;
        }
      ),
      retryWhen(errors => errors.pipe(delay(5000)))
    ).subscribe();

  }

}
