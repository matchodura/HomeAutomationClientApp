
import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants {
public static LOGGING_API_ENDPOINT: string = 'https://localhost:5001/api/v1/Logging/'; 
public static STATUS_API_ENDPOINT: string = 'https://localhost:7053/api/v1/Status/'; 
public static HOME_CONTROL_API_ENDPOINT: string = 'https://localhost:9053/api/v1/Room/'; 
public static HOME_CONTROL_API_ROOM_ENDPOINT: string = 'https://localhost:9053/api/v1/Item/'; 
public static STATUS_API_HEALTH: string = 'https://localhost:7053/health'; 
public static LOGGING_API_HEALTH: string = 'https://localhost:5001/health'; 
public static HOME_CONTROL_API_HEALTH: string = 'https://localhost:9053/health'; 
public static HARDWARE_STATUS_API_HEALTH: string = 'https://localhost:10001/health'; 

public static STATUS_SIGNALR_ENDPOINT: string = 'https://localhost:7053/'; 

public static SEQ_URL: string = 'http://192.168.0.185:5341/'; 
} 