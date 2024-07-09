import { useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import welcomeimage from "../../../images/welcomeimage.png";

export function WelcomeCard() {
  const tasks = useSelector((state: RootState) => state.task);

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 1,
        backgroundColor: "#F9FAFB",
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={welcomeimage}
        alt="Welcome"
        sx={{ height: 120, objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          {"Welcome ;)"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          This is the welcome page where you can find information about your
          tasks and manage them.
        </Typography>
      </CardContent>
    </Card>
  );
}
