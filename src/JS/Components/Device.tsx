import { useState } from 'react';
import '../../CSS/device.css';
import ArrowDown from "../../assets/down_arrow.svg";
import ArrowRight from "../../assets/right_arrow.svg";
import type { DeviceData } from "../../types/DeviceData";

type DeviceProps = {
  device: DeviceData;
};

function Device({ device }: DeviceProps) {
  const [opened, setOpened] = useState(true);

  return (
    <div className="pb-3">
      <div className="device-name d-flex gap-2" onClick={() => setOpened(prev => !prev)}>
        <h3>Device {device.id}</h3>
        <img src={opened ? ArrowDown : ArrowRight} />
      </div>
      {opened && (
        <div className="device-info p-2">
          <p>Humidity: {device.humidity}</p>
          <p>Luminance: {device.lum}</p>
          <p>Is valve open: {device.openValve ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  )
}

export default Device;