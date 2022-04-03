export interface SensorStatus {
    name: string;
    topic: string;
    ip: string;  
    status: string;
    lastCheck: Date;
    lastAlive: Date;
    uptimeInSeconds: number;
    wasOnline: boolean;
  }