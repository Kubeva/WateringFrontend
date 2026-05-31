import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import Header from "./Components/Header.tsx";
import Device from './Components/Device.tsx';
import type { DeviceData } from "../types/DeviceData";

function App() {
  const [connectedDevices, setConnectedDevices] = useState<DeviceData[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");

     socket.on("devices", (data: DeviceData[]) => {
      setConnectedDevices(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container p-3">
        <h1 className="pb-2">Connected devices</h1>
        {connectedDevices.map((device, index) => (
          <Device key={device.id} device={device}/>
        ))}
      </div>
    </>
  )
}

export default App
