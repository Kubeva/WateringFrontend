import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "bootstrap/dist/css/bootstrap.min.css";

import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import Header from "./Components/Header";
import Device from "./Components/Device";

import type { DeviceData } from "../types/DeviceData";

const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4000";

function App() {
  const [connectedDevices, setConnectedDevices] = useState<DeviceData[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/devices`)
      .then(response => response.json())
      .then((data: DeviceData[]) => setConnectedDevices(data))
      .catch(error => console.error("Failed to fetch devices:", error));

    const socket = io(API_BASE);

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

      <Container as="main" className="py-4">
        <Stack direction="horizontal" className="justify-content-between align-items-baseline mb-4">
          <div>
            <h1 className="display-6 mb-1">Connected devices</h1>
            <p className="text-muted mb-0">
              Runtime humidity and luminance history for each watering node.
            </p>
          </div>

          <Badge bg="secondary">
            {connectedDevices.length} node{connectedDevices.length === 1 ? "" : "s"}
          </Badge>
        </Stack>

        {connectedDevices.length === 0 ? (
          <Alert variant="secondary">
            No devices have reported state yet.
          </Alert>
        ) : (
          connectedDevices.map(device => (
            <Device key={device.id} device={device} />
          ))
        )}
      </Container>
    </>
  );
}

export default App;
