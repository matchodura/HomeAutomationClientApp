import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogLoggingComponent } from '../dialog-logging/dialog-logging.component';
import { LoggingServiceService } from '../services/logging/logging-service.service';
import { SensorData } from '../interfaces/sensorData';
import { StatusServiceService } from '../services/status/status-service.service';
import { SensorStatus } from '../interfaces/SensorStatus';


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  sensorNames: string[] = [];

  multiAxisData: any[] = [];

  multiAxisOptions: any;

  loading: boolean = true;

  sensorStatus: SensorStatus = {
      name: '',
      topic: '',
      ip: '',
      status: '',
      lastCheck: new Date(),
      lastAlive: new Date(),
      uptimeInSeconds: 0,
      wasOnline: false
  };
  
  constructor(public dialog: MatDialog, private loggingService: LoggingServiceService, private statusService: StatusServiceService) { }

  drop(event: CdkDragDrop<any>) {
    this.sensorNames[event.previousContainer.data.index]=event.container.data.item
    this.sensorNames[event.container.data.index]=event.previousContainer.data.item
  }

  async openDialog(event: any, sensorName: any) {
        console.log(event.target.getBoundingClientRect());
        let targetAttr = event.target.getBoundingClientRect();
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;            

        dialogConfig.position = {
        top: targetAttr.y + targetAttr.height + 10 + "px",
        left: targetAttr.x - targetAttr.width - 20 + "px"
        };

        dialogConfig.data = sensorName;

        const dialogRef = this.dialog.open(DialogLoggingComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
        console.log("Dialog output:", data);
        });
    }

    ngOnInit() {
        this.getAvailableSensors();  
        this.setupChartOptions();   
    };

    getAvailableSensors(){
            this.loggingService.getLoggingDeviceList().subscribe((res: any) =>
            {
                this.sensorNames = res;
                res.forEach((element: string, index: any) => {                       
                    this.setupCharts(element);     
                    console.log(element);                                    
                });         
            }
        );
    }

    setupCharts(sensorName: string){

        this.loggingService.getLoggingDeviceValues<SensorData>(sensorName).subscribe(data => {           
            
                let labels = data.values.map(obj => obj.time);

                let temperature = data.values.map(obj => obj.temperature);
                let humidity = data.values.map(obj => obj.humidity);

                let chartData = {
                    labels: labels,
                    datasets: [{
                        label: 'Temperature',
                        fill: true,
                        borderColor: '#42A5F5',
                        yAxisID: 'y',
                        tension: .4,
                        data: temperature
                    }, {
                        label: 'Humidity',
                        fill: true,
                        borderColor: '#00bb7e',
                        yAxisID: 'y1',
                        tension: .4,
                        data: humidity
                    }]
                };

                this.multiAxisData?.push(chartData);
                console.log("iteracja");
                console.log(this.multiAxisData)
                this.loading = false;
        })
    }

    setupChartOptions(){
        this.multiAxisOptions = {
            stacked: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    }
                }
            }
        }  
    }

}
