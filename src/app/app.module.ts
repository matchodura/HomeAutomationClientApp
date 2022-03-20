import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatIconModule} from  '@angular/material/icon';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatListModule} from  '@angular/material/list';
import { MatButtonModule} from  '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggingComponent } from './logging/logging.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogLoggingComponent } from './dialog-logging/dialog-logging.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoggingComponent,
    RoomsComponent,
    DialogLoggingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    DragDropModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
    ChartModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
