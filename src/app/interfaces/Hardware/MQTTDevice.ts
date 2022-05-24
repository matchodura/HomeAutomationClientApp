export class MQTTDevice {   
    name!: string;
    deviceType!: DeviceType
    topic!: string;
    IP!: string;    
    MAC!: string;
    hostName!: string;
    mosquittoUsername!: string;
    mosquittoPassword!: string;
}

enum DeviceType {
    Sensor,
    Switch,
    Lamp,
    Unknown
  }