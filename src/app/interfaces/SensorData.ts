export interface SensorData {
    name: string;
    topic: string;
    values: SensorValues[];
  }

export interface SensorValues{
    temperature: number;
    humidity: number;
    dewpoint: number;
    time: Date;
}