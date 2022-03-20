
import { Injectable } from '@angular/core'; 
@Injectable() 
export class Constants {
public static LOGGING_API_ENDPOINT: string = 'https://localhost:5001/api/v1/Logging/'; 
public static STATUS_API_ENDPOINT: string = 'https://localhost:7053/api/v1/Status/'; 
} 