import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AuthDisplay from "../components/organisms/auth/AuthDisplay";
import AuthBackground from "../components/molecules/auth/AuthBackground";

export function Auth() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Grid
        container
        sx={{
          minHeight: "100vh",
        }}
      >
        <AuthDisplay />
      </Grid>
    </Box>
  );
}
