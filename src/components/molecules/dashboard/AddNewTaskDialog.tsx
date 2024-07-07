import React, { useEffect, useState } from "react";
import { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AddNewTaskDialogProps } from "../../../interfaces/task/AddNewTaskDialogProps";
import { NewTaskRequest } from "../../../interfaces/task/NewTaskRequest";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AddTask } from "../../../services/TasksService";
import { setTasks } from "../../../store/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../interfaces/RootState";
import { Task } from "../../../interfaces/task/Task";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MAX_DISPLAY_ITEMS = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * (MAX_DISPLAY_ITEMS + 0.5) + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const AddNewTaskDialog = ({
  visible,
  onHide,
  handleClick,
}: AddNewTaskDialogProps) => {
  const initialFormData = {
    title: "",
    description: "",
    dueDate: null,
    priority: "",
    category: "",
  };

  const [formData, setFormData] = useState<NewTaskRequest>(initialFormData);
  const categories = ["Work", "Personal"];
  const priorities = ["Low", "Medium", "High"];
  const tasks = useSelector((state: RootState) => state.task);

  const isAddButtonDisabled = Object.entries(formData).some(
    ([key, value]) => value === "" || value === null
  );
  const dispatch = useDispatch();
  const handleFieldChange = (
    fieldName: string,
    value: string | Date | null
  ) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleAddButtonClick = () => {
    // console.log(formData);
    AddTask(formData)
      .then((response) => {
        const updatedTasks: Task[] = [...tasks, response.data];
        dispatch(setTasks(updatedTasks));
        handleClick("Task Added successfully", "success");
      })
      .catch((err) => {
        console.error("API request error:", err);
        handleClick("An error happened during the creation of a task", "error");
      });
    setFormData(initialFormData);
    onHide();
  };
  const handleCancelButtonClick = () => {
    setFormData(initialFormData);
    onHide();
  };

  return (
    <div>
      <Dialog fullWidth open={visible} onClose={handleCancelButtonClick}>
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
          {`Add new task`}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1.4fr 4fr" },
                gap: 2,
              }}
            >
              <FormControl>
                <InputLabel id="category-select" required>
                  Category
                </InputLabel>
                <Select
                  required
                  labelId="category-select"
                  id="category-select"
                  label="Category"
                  input={<OutlinedInput label="Category" />}
                  value={formData.category}
                  onChange={(e) =>
                    handleFieldChange("category", e.target.value)
                  }
                  MenuProps={MenuProps}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Title"
                required
                style={{ width: "100%" }}
                variant="outlined"
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              ></TextField>
            </Box>
            <Box
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 2fr" },
                gap: 2,
              }}
            >
              <FormControl>
                <InputLabel id="priority-select" required>
                  Priority
                </InputLabel>
                <Select
                  required
                  labelId="priority-select"
                  id="priority-select"
                  label="Priority"
                  input={<OutlinedInput label="Priority" />}
                  value={formData.priority}
                  onChange={(e) =>
                    handleFieldChange("priority", e.target.value)
                  }
                  MenuProps={MenuProps}
                >
                  {priorities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    handleFieldChange("dueDate", dayjs(e).format("YYYY-MM-DD"))
                  }
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Box>

            <TextField
              label="Description"
              style={{ width: "100%" }}
              variant="outlined"
              required
              multiline
              minRows={4}
              maxRows={4}
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            ></TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="success"
            onClick={handleAddButtonClick}
            style={{ fontWeight: "bold" }}
            disabled={isAddButtonDisabled}
          >
            Add
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={handleCancelButtonClick}
            style={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewTaskDialog;
