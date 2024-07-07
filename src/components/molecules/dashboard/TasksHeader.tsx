import Grid from "@mui/material/Grid";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";
// import { Delete } from "../../atoms/management/Delete";
// import { Edit } from "../../atoms/management/Edit";
// import { MarkAsClosed } from "../../atoms/management/MarkAsClosed";
import Stack from "@mui/material/Stack";
// import { ClearFilters } from "../../atoms/management/ClearFilters";
import { DataTableFilterMeta } from "primereact/datatable";
import { AddTask } from "../../atoms/dashboard/AddTask";
import { Task } from "../../../interfaces/task/Task";
import { Delete } from "../../atoms/dashboard/Delete";
// import { setFilter } from "../../../Redux/TicketFilter/filterSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const TasksHeader: React.FC<{
  selectedTasks: Task[] | null;
  setSelectedTasks: React.Dispatch<React.SetStateAction<Task[] | null>>;
  setFilters: React.Dispatch<React.SetStateAction<DataTableFilterMeta>>;
}> = ({ selectedTasks, setSelectedTasks, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor | undefined>();

  const handleClick = (msg: string, sev: AlertColor | undefined) => {
    setSeverity(sev);
    setMessage(msg);
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Grid
      container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      xs={12}
      spacing={2}
    >
      <Grid item>
        <Stack direction="row" spacing={0}>
          <AddTask handleClick={handleClick} />
          {/* <Edit
            handleClick={handleClick}
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          /> */}
          {/* <Sync /> */}
          <Delete
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          />
          {/* <MarkAsClosed
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          /> */}
        </Stack>
      </Grid>
      {/* <Grid item>
        <ClearFilters setFilters={setFilters} />
      </Grid> */}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};
