import Grid from "@mui/material/Grid";
import { TasksTable } from "../../molecules/dashboard/TasksTable";
import { TopBar } from "../../molecules/dashboard/TopBar";
import { Stack } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { TasksPie } from "../../molecules/dashboard/TasksPie";

export function DashboardDisplay() {
  return (
    <Stack spacing={2}>
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
          <Grid container>
            <Grid item xs={12} md={6}>
              <TasksPie />
            </Grid>
            <Grid item xs={12} md={6}>
              <h1>DIAGRAM</h1>
            </Grid>
          </Grid>
          <Grid container marginTop={5}>
            <Grid item xs={12}>
              <TasksTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
