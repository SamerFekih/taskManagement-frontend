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
        backgroundColor: "#F9FAFB",
        boxShadow: 3,
        maxHeight: 95,
      }}
    >
      <CardContent>
        <Typography variant="h5">{tasks.length}</Typography>
        <Typography variant="body2" color="textSecondary">
          Number of tasks
        </Typography>
      </CardContent>
    </Card>
  );
}
