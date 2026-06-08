import { useState } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import type { DeviceData } from "../../types/DeviceData";
import SimpleLineChart from "./SimpleLineChart";

type DeviceProps = {
  device: DeviceData;
};

const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:4000";

function formatDateTime(value?: string) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString();
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Text className="text-muted small mb-1">{label}</Card.Text>
        <div className="fs-3 fw-semibold">{value}</div>
        {detail && <Card.Text className="text-muted small mb-0">{detail}</Card.Text>}
      </Card.Body>
    </Card>
  );
}

function Device({ device }: DeviceProps) {
  const [opened, setOpened] = useState(true);

  const openTime = 5000;

  async function openValve() {
    await fetch(`${API_BASE}/devices/${device.id}/valve/open`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valveTime: openTime,
      }),
    });
  }

  async function closeValve() {
    await fetch(`${API_BASE}/devices/${device.id}/valve/close`, {
      method: "POST",
    });
  }

  const humidityHistory = device.history?.map(point => ({
    time: point.time,
    value: point.humidity,
  })) ?? [];

  const lightHistory = device.history?.map(point => ({
    time: point.time,
    value: point.lum,
  })) ?? [];

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header
        role="button"
        onClick={() => setOpened(previous => !previous)}
        className="d-flex justify-content-between align-items-center"
        aria-controls={`device-${device.id}-body`}
        aria-expanded={opened}
      >
        <div>
          <Card.Title as="h3" className="h5 mb-0">
            Device {device.id}
          </Card.Title>
          <Card.Text className="text-muted small mb-0">
            Last seen: {formatDateTime(device.lastSeen)}
          </Card.Text>
        </div>

        <Badge bg={device.openValve ? "warning" : "success"} text={device.openValve ? "dark" : undefined}>
          Valve {device.openValve ? "open" : "closed"}
        </Badge>
      </Card.Header>

      <Collapse in={opened}>
        <div id={`device-${device.id}-body`}>
          <Card.Body>
            <Row className="g-3 mb-4">
              <Col xs={12} md={6} xl={3}>
                <StatCard
                  label="Humidity"
                  value={`${device.humidity}%`}
                  detail={`Raw: ${device.humidity_raw}`}
                />
              </Col>

              <Col xs={12} md={6} xl={3}>
                <StatCard
                  label="Highest humidity"
                  value={`${device.humidityStats?.highest?.value ?? "—"}%`}
                  detail={formatDateTime(device.humidityStats?.highest?.time)}
                />
              </Col>

              <Col xs={12} md={6} xl={3}>
                <StatCard
                  label="Lowest humidity"
                  value={`${device.humidityStats?.lowest?.value ?? "—"}%`}
                  detail={formatDateTime(device.humidityStats?.lowest?.time)}
                />
              </Col>

              <Col xs={12} md={6} xl={3}>
                <StatCard
                    label="Luminance"
                    value={`${device.lum} lux`}
                    detail={`CH0: ${device.lum_ch0}, CH1: ${device.lum_ch1}`}
                />
              </Col>
            </Row>

            <Row className="g-3 mb-4">
              <Col xs={12} xl={6} className="text-primary">
                <SimpleLineChart
                  title="Humidity history"
                  unit="%"
                  data={humidityHistory}
                />
              </Col>

              <Col xs={12} xl={6} className="text-success">
                <SimpleLineChart
                  title="Light history"
                  unit="lux"
                  data={lightHistory}
                />
              </Col>
            </Row>

            <Stack direction="horizontal" gap={2} className="flex-wrap">

              <Button variant="primary" onClick={openValve}>
                Open for {openTime / 1000}s
              </Button>

              <Button variant="danger" onClick={closeValve}>
                Emergency close
              </Button>
            </Stack>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
}

export default Device;
