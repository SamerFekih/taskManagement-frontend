import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import AddNewTaskDialog from "../../molecules/dashboard/AddNewTaskDialog";

export const AddTask: React.FC<{
  handleClick: (msg: string, sev: AlertColor | undefined) => void;
}> = ({ handleClick }) => {
  const [AddNewDialogVisible, setAddNewDialogVisible] =
    useState<boolean>(false);

  const handleAddNewTaskDialog = () => {
    setAddNewDialogVisible(true);
  };

  const hideAddNewTaskDialog = () => {
    setAddNewDialogVisible(false);
  };

  return (
    <div>
      <Button
        component="label"
        size="medium"
        variant="text"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleAddNewTaskDialog}
      >
        Add
      </Button>
      <AddNewTaskDialog
        visible={AddNewDialogVisible}
        onHide={hideAddNewTaskDialog}
        handleClick={handleClick}
      />
    </div>
  );
};
