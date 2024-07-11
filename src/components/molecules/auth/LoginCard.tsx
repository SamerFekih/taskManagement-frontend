import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import taskmgnmnt from "../../../images/taskmgnmnt.png";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { Login } from "../../../services/AuthService";
import { LoginFormData } from "../../../interfaces/auth/LoginFormDataProps";

export default function LoginCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [Errors, setErrors] = useState<string>("");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors("");
  };

  const handleSubmit = async () => {
    try {
      const response = await Login(formData);
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      setErrors("Invalid credentials, try again.");
    }
  };

  return (
    <Card square elevation={6}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 2,
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
            <Divider>TASK MANAGEMENT</Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                noValidate
                sx={{ mt: 2 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="username-login">Username</InputLabel>
                      <OutlinedInput
                        id="username-login"
                        size="small"
                        type="username"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter username"
                        fullWidth
                        error={Boolean(Errors)}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password-login">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={Boolean(Errors)}
                        size="small"
                        id="-password-login"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="medium"
                            >
                              {showPassword ? (
                                <EyeOutlined />
                              ) : (
                                <EyeInvisibleOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Enter password"
                      />
                    </Stack>
                  </Grid>

                  {Errors && (
                    <Grid item xs={12}>
                      <FormHelperText error>{Errors}</FormHelperText>{" "}
                    </Grid>
                  )}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link component={RouterLink} to="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </CardContent>
      </Box>
    </Card>
  );
}
