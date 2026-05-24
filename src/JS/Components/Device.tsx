import { useState } from 'react';
import '../../CSS/device.css';
import ArrowDown from "../../assets/down_arrow.svg";
import ArrowRight from "../../assets/right_arrow.svg";

type deviceProps = {
  device: number;
  deviceNr: number;
};

function Device({ device, deviceNr }: deviceProps) {
  const [opened, setOpened] = useState(true);

  return (
    <div className="pb-3">
      <div className="device-name d-flex gap-2" onClick={() => setOpened(prev => !prev)}>
        <h3>Device {deviceNr}</h3>
        <img src={opened ? ArrowDown : ArrowRight} />
      </div>
      {opened && (
        <div className="device-info p-2">
          <p>Humidity:</p>
          <p>Luminance:</p>
        </div>
      )}
    </div>
  )
}

export default Device;