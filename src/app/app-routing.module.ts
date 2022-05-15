import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggingComponent } from './logging/logging.component';
import { NetworkDevicesComponent } from './network-devices/network-devices.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ServicesStatusComponent } from './services-status/services-status.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: 'dasbhoard', component: DashboardComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'logging', component: LoggingComponent },
  { path: 'status', component: StatusComponent },
  { path: 'services-status', component: ServicesStatusComponent },
  { path: 'network-devices', component: NetworkDevicesComponent },
  { path: 'configuration', component: ConfigurationComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
