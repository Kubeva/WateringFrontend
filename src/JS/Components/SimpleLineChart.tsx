import Card from "react-bootstrap/Card";

export type ChartPoint = {
  time: string;
  value: number;
};

type SimpleLineChartProps = {
  title: string;
  unit: string;
  data: ChartPoint[];
};

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString();
}

function SimpleLineChart({ title, unit, data }: SimpleLineChartProps) {
  const width = 640;
  const height = 180;
  const padding = 32;

  const validData = data.filter(point => Number.isFinite(point.value));

  if (validData.length === 0) {
    return (
      <Card bg="light" className="h-100">
        <Card.Body>
          <Card.Subtitle className="mb-2">{title}</Card.Subtitle>
          <Card.Text className="text-muted mb-0">No samples yet.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const values = validData.map(point => point.value);
  const minValue = Math.min(...values);
  let maxValue = Math.max(...values);

  if (minValue === maxValue) {
    maxValue += 1;
  }

  const xFor = (index: number) => {
    if (validData.length === 1) {
      return width / 2;
    }

    return padding + index * ((width - padding * 2) / (validData.length - 1));
  };

  const yFor = (value: number) => {
    const normalised = (value - minValue) / (maxValue - minValue);
    return height - padding - normalised * (height - padding * 2);
  };

  const path = validData
    .map((point, index) => {
      const x = xFor(index);
      const y = yFor(point.value);

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const first = validData[0];
  const last = validData[validData.length - 1];

  return (
    <Card bg="light" className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <Card.Subtitle className="mb-0">{title}</Card.Subtitle>
          <span className="text-muted small">
            {last.value} {unit}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-100"
          role="img"
          aria-label={title}
        >
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="currentColor"
            opacity="0.25"
          />

          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="currentColor"
            opacity="0.25"
          />

          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {validData.map((point, index) => (
            <circle
              key={`${point.time}-${index}`}
              cx={xFor(index)}
              cy={yFor(point.value)}
              r="3"
              fill="currentColor"
            />
          ))}

          <text x={padding} y={height - 8} fontSize="12" fill="currentColor">
            {formatTime(first.time)}
          </text>

          <text
            x={width - padding}
            y={height - 8}
            fontSize="12"
            textAnchor="end"
            fill="currentColor"
          >
            {formatTime(last.time)}
          </text>

          <text x={padding + 4} y={padding} fontSize="12" fill="currentColor">
            {maxValue.toFixed(1)} {unit}
          </text>

          <text
            x={padding + 4}
            y={height - padding - 4}
            fontSize="12"
            fill="currentColor"
          >
            {minValue.toFixed(1)} {unit}
          </text>
        </svg>
      </Card.Body>
    </Card>
  );
}

export default SimpleLineChart;
