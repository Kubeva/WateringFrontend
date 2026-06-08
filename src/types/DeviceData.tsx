export type MeasurementPoint = {
  time: string;
  humidity: number;
  lum: number;
};

export type HumidityExtreme = {
  value: number;
  time: string;
};

export type HumidityStats = {
  highest: HumidityExtreme | null;
  lowest: HumidityExtreme | null;
};

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

  history: MeasurementPoint[];
  humidityStats: HumidityStats;
};
