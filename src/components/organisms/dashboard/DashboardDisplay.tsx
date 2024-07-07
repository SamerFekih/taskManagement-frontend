import Grid from "@mui/material/Grid";
import { TasksTable } from "../../molecules/dashboard/TasksTable";
import { TopBar } from "../../molecules/dashboard/TopBar";
import { Stack } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export function DashboardDisplay() {
  return (
    <Stack>
      <TopBar />

      <Grid
        container
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <h1>PIE</h1>
            </Grid>
            <Grid item xs={12} md={4}>
              <h1>Diagram</h1>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TasksTable />
        </Grid>
      </Grid>
    </Stack>
  );
}
