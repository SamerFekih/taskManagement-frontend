import Grid from "@mui/material/Grid";
import { TasksTable } from "../../molecules/dashboard/TasksTable";
import { TopBar } from "../../molecules/dashboard/TopBar";

export function DashboardDisplay() {
  return (
    <>
      <TopBar />

      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item display="flex" marginBottom="5vh" marginTop="3vh">
          <TasksTable />
        </Grid>
      </Grid>
    </>
  );
}
