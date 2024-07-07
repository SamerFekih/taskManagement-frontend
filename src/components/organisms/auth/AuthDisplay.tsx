import Grid from "@mui/material/Grid";
import LoginCard from "../../molecules/auth/LoginCard";
import AuthFooter from "../../molecules/auth/AuthFooter";
import RegisterCard from "../../molecules/auth/RegisterCard";

export default function AuthDisplay() {
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="row"
      style={{ minHeight: "95vh" }}
      spacing={2}
    >
      <Grid
        item
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 3 }}
      >
        {location.pathname === "/register" ? <RegisterCard /> : <LoginCard />}
      </Grid>
      <Grid item xs={12}>
        <AuthFooter />
      </Grid>
    </Grid>
  );
}
