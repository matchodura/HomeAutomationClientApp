export class HardwareDevice {
    id!: number;
    name!: string;
    hardwareType!: HardwareType;
    hostName!: string;
    iP!: string;
    mAC!: string;
    friendlyName!: string;
    dateAdded!: string;
    dateModified!: string;
    lastCheck!: string;
    lastAlive!: string;
    deviceStatus!: DeviceStatus;
}

export enum DeviceStatus {
    Online,
    Offline,
    Unknown
}

export enum HardwareType
{
    Placeholder,
    Computer,
    Smartphone,
    HomeAppliance,
    Sensor,
    Lamp,
    Networking,
    Unknown,
    TV
}

