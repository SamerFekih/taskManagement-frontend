import Grid from "@mui/material/Grid";
import { TasksTable } from "../../molecules/dashboard/TasksTable";
import { TopBar } from "../../molecules/dashboard/TopBar";
import { Stack } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { TasksPie } from "../../molecules/dashboard/TasksPie";
import { TasksBarChart } from "../../molecules/dashboard/TasksBarChart";
import { TasksInfoCard } from "../../molecules/dashboard/TasksInfoCard";
import { WelcomeCard } from "../../molecules/dashboard/WelcomeCard";

export function DashboardDisplay() {
  return (
    <Stack spacing={2}>
      <TopBar />
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <WelcomeCard />
                </Grid>
                <Grid item xs={12}>
                  <TasksInfoCard />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4.7}>
              <TasksPie />
            </Grid>
            <Grid item xs={12} md={5.3}>
              <TasksBarChart />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <TasksTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
