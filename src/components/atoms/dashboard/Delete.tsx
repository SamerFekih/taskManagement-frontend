import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DeleteTasks } from "../../../services/TasksService";
import { RootState } from "../../../interfaces/RootState";
import { setTasks } from "../../../store/TaskSlice";
export const Delete: React.FC<{
  selectedTasks: any[] | null;
  setSelectedTasks: React.Dispatch<React.SetStateAction<any[] | null>>;
}> = ({ selectedTasks, setSelectedTasks }) => {
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);
  const tasks = useSelector((state: RootState) => state.task);

  const handleDeleteClick = async () => {
    const taskIDs = selectedTasks?.map((task) => task.id) ?? [];
    try {
      await DeleteTasks(taskIDs);
      showMessage("success", "Success", `Tasks deleted successfully.`);
      const updatedTasks = tasks.filter((task) => !taskIDs.includes(task.id));
      dispatch(setTasks(updatedTasks));
    } catch (err) {
      showMessage("error", "Error", `Failed to delete selected tasks.`);
    }

    setSelectedTasks(null);
  };

  const showMessage = (
    severity: "success" | "info" | "warn" | "error" | undefined,
    summary: string,
    message: string
  ) => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: message,
      life: 3000,
    });
  };
  const confirm1 = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-info",
      accept: handleDeleteClick,
    });
  };
  return (
    <div>
      <Button
        component="label"
        size="medium"
        variant="text"
        color="error"
        disabled={selectedTasks === null || selectedTasks.length === 0}
        startIcon={<DeleteIcon />}
        onClick={confirm1}
      >
        Delete
      </Button>
      <ConfirmDialog />

      <Toast ref={toast} position="bottom-left" />
    </div>
  );
};
