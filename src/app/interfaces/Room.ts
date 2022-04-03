export interface Room{
    frontendID: string;
    level: number;
    name: string;
    aliveDevicesCount: number;
    roomValue: {
      temperature: number,
      humidity: number,
      topic: string,
      lastModified: Date
    }
  }