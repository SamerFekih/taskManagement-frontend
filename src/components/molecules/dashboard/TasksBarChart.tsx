import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { GetTasksPriorityStatistics } from "../../../services/TasksStatisticsService";

export function TasksBarChart() {
  const [data, setData] = useState([]);
  const tasks = useSelector((state: RootState) => state.task);
  useEffect(() => {
    GetTasksPriorityStatistics()
      .then((response) => {
        const formattedData = Object.keys(response.data.priorityCount).map(
          (category) => {
            const categoryData = response.data.priorityCount[category];
            return {
              category,
              high: categoryData.High ? categoryData.High[1] : 0,
              medium: categoryData.Medium ? categoryData.Medium[1] : 0,
              low: categoryData.Low ? categoryData.Low[1] : 0,
            };
          }
        );
        setData(formattedData);
      })
      .catch((err) => {
        console.error("API request error:", err);
      });
  }, [tasks]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Task Priority Distribution by category
      </Typography>
      <BarChart
        xAxis={[{ scaleType: "band", data: data.map((item) => item.category) }]}
        series={[
          {
            data: data.map((item) => item.high),
            stack: "A",
            label: "High",
            color: "#EF4444",
          },
          {
            data: data.map((item) => item.medium),
            stack: "B",
            label: "Medium",
            color: "#F97316",
          },
          {
            data: data.map((item) => item.low),
            stack: "C",
            label: "Low ",
            color: "#0EA5E9",
          },
        ]}
        width={600}
        height={350}
      />
    </div>
  );
}
