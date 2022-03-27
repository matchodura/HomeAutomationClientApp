import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggingComponent } from './logging/logging.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ServicesStatusComponent } from './services-status/services-status.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  { path: 'dasbhoard', component: DashboardComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'logging', component: LoggingComponent },
  { path: 'status', component: StatusComponent },
  { path: 'services-status', component: ServicesStatusComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
