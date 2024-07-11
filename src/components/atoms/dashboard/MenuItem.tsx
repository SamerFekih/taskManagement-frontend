import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import { useRef, useState } from "react";

export default function MenuItem() {
  const navigate = useNavigate();

  const decodedToken = jwt_decode(localStorage.getItem("token"));
  const firstname = decodedToken ? decodedToken.firstname : "";
  const lastname = decodedToken ? decodedToken.lastname : "";
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };
  const anchorRef = useRef<any>(null);
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const menuopen = Boolean(anchorEl);

  const handleToggle = () => {
    setAnchorEl((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAnchorEl(false);
  };
  return (
    <Box
      sx={{
        display: { marginRight: "25px", xs: "none", sm: "block" },
      }}
    >
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: menuopen ? "grey.200" : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "grey.100" },
        }}
        ref={anchorRef}
        aria-label="open profile"
        aria-controls={menuopen ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ p: 0.5 }}
        >
          <Avatar sx={{ width: 30, height: 30, background: "#2C3E5f" }}>
            {firstname.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            fontSize={15}
            variant="subtitle1"
            style={{ color: "#34414B" }}
          >
            {firstname + " " + lastname}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        anchorEl={anchorRef.current}
        open={menuopen}
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 12],
              },
            },
          ],
        }}
      >
        {menuopen && (
          <Paper
            sx={{
              boxShadow: 1,
              width: 290,
              minWidth: 240,
              maxWidth: 290,
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Card elevation={0}>
                <CardContent sx={{ px: 2.5, pt: 3 }}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Grid item>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            background: "#2C3E5f",
                          }}
                        >
                          {firstname.charAt(0).toUpperCase()}
                        </Avatar>
                        <Stack>
                          <Typography fontSize={14}>
                            {firstname + " " + lastname}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={handleLogout}
                      >
                        <LogoutOutlined />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <List
                  component="nav"
                  sx={{
                    p: 0,
                    "& .MuiListItemIcon-root": {
                      minWidth: 32,
                      color: "grey.500",
                    },
                  }}
                >
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </List>
              </Card>
            </ClickAwayListener>
          </Paper>
        )}
      </Popper>
    </Box>
  );
}
