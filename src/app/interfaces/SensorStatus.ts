export interface SensorStatus {
    name: string;
    topic: string;
    ip: string;  
    status: string;
    lastAlive: Date;
    uptimeInSeconds: number;
  }