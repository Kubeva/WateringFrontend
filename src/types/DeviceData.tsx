export type DeviceData = {
  id: number;

  humidity: number;
  humidity_raw: number;

  lum: number;
  lum_ch0: number;
  lum_ch1: number;

  openValve: boolean;

  lastSeen?: string;
  requestedValveOpen?: boolean;
  requestedValveTime?: number;
  lastCommandAt?: string;
};