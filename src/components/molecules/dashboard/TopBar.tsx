import { Box, Toolbar, Typography, alpha } from "@mui/material";
import taskmgnmnt from "../../../images/taskmgnmnt.png";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuItem from "../../atoms/dashboard/MenuItem";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backdropFilter: `blur(6px)`,
  WebkitBackdropFilter: `blur(6px)`,
  backgroundColor: alpha("#ffffff", 0.8),
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export function TopBar() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflow: "auto",
        py: 2,
        px: 2,

        p: { xs: 3, sm: 5 },
      }}
    >
      <AppBar
        position="fixed"
        elevation={1}
        style={{
          borderBottom: `3px solid `,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={taskmgnmnt}
              alt="logo"
              style={{
                height: 80,
                maxWidth: 450,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            color={"black"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Task Management
          </Typography>
          <MenuItem />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
