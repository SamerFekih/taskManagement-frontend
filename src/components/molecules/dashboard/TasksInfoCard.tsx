import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Card, CardContent, Typography } from "@mui/material";

export function TasksInfoCard() {
  const tasks = useSelector((state: RootState) => state.task);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 1,
        backgroundColor: "#f0f0f0",
        boxShadow: 3,
        maxHeight: 95,
      }}
    >
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          {tasks.length}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Number of tasks
        </Typography>
      </CardContent>
    </Card>
  );
}
