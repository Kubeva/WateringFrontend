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

    async function openValve() {
        await fetch(`http://localhost:4000/devices/${device.id}/valve/open`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                valveTime: 30000,
            }),
        });
    }

    async function closeValve() {
        await fetch(`http://localhost:4000/devices/${device.id}/valve/close`, {
            method: "POST",
        });
    }

    return (
        <div className="pb-3">
            <div className="device-name d-flex gap-2" onClick={() => setOpened(prev => !prev)}>
                <h3>Device {device.id}</h3>
                <img src={opened ? ArrowDown : ArrowRight} />
            </div>

            {opened && (
                <div className="device-info p-2">
                    <p>Humidity: {device.humidity}%</p>
                    <p>Humidity raw: {device.humidity_raw}</p>

                    <p>Luminance: {device.lum} lux</p>
                    <p>Light CH0: {device.lum_ch0}</p>
                    <p>Light CH1: {device.lum_ch1}</p>

                    <p>Valve open: {device.openValve ? "Yes" : "No"}</p>

                    {device.lastSeen && (
                        <p>Last seen: {device.lastSeen}</p>
                    )}

                    <div className="d-flex gap-2">
                        <button onClick={openValve}>
                            Open for 1s
                        </button>

                        <button onClick={closeValve}>
                            Emergency close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Device;