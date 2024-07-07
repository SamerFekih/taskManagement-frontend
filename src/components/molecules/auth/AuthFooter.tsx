// material-ui
import { Container, Typography, Stack } from "@mui/material";

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container maxWidth="xl">
      <Stack
        direction={"row"}
        justifyContent={"center"}
        spacing={1}
        textAlign={"center"}
      >
        <Typography variant="subtitle2" color="inherit" component="span">
          &copy;Task Management, {currentYear}.
        </Typography>
      </Stack>
    </Container>
  );
};

export default AuthFooter;
