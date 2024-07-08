import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { GetTasksStatusStatistics } from "../../../services/TasksStatisticsService";
import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Typography } from "@mui/material";

export function TasksPie() {
  const [data, setData] = useState([]);
  const tasks = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (tasks.length != 0) {
      GetTasksStatusStatistics()
        .then((response) => {
          const formattedData = Object.keys(response.data.statusCount).map(
            (key, index) => {
              let color;
              switch (key) {
                case "Pending":
                  color = "#F97316";
                  break;
                case "In Progress":
                  color = "#0EA5E9";
                  break;
                case "Blocked":
                  color = "#EF4444";
                  break;
                case "Completed":
                  color = "#22C55E";
                  break;
                default:
                  color = "#888888";
              }
              return {
                id: index,
                value: response.data.statusCount[key],
                label: key,
                color: color,
              };
            }
          );
          setData(formattedData);
        })
        .catch((err) => {
          console.error("API request error:", err);
        });
    }
  }, [tasks]);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Task Status Distribution
      </Typography>
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) =>
              `${((item.value * 100) / tasks.length).toFixed(2)}%`,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 12,
          },
        }}
        height={300}
        width={600}
      />
    </div>
  );
}
