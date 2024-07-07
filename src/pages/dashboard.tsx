import Stack from "@mui/material/Stack";
import { DashboardDisplay } from "../components/organisms/dashboard/DashboardDisplay";
import { TopBar } from "../components/molecules/dashboard/TopBar";
import { Box } from "@mui/material";

export function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <DashboardDisplay />
    </Box>
  );
}
