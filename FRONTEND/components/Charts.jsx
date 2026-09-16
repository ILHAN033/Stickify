import { useState } from "react";
import { getChartData } from "../src/chartUtils";

const Charts = ({ notes, tasks }) => {
  const [chartRange, setChartRange] = useState("7");
  const [currentTime] = useState(() => Date.now());
  const { labels: chartLabels, values: chartValues, counts } = getChartData(
    [...notes, ...tasks],
    chartRange,
    currentTime
  );

  return (
    <section className="panel chart-panel standalone-panel">
      <div className="panel-header">
        <div>
          <h2>Productivity Charts</h2>
          <p>Review activity from your notes and tasks.</p>
        </div>
        <select
          value={chartRange}
          onChange={(event) => setChartRange(event.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
        </select>
      </div>
      <div className="fake-chart">
        {chartLabels.map((label, index) => (
          <div
            className="chart-bar"
            style={{ height: `${chartValues[index]}%` }}
            key={label}
          >
            <strong>{counts[index]}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Charts;