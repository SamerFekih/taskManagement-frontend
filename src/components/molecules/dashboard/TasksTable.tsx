import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { GetTasks } from "../../../services/TasksService";
import { Tag } from "primereact/tag";
import { Task } from "../../../interfaces/task/Task";
import { TasksHeader } from "./TasksHeader";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../../store/TaskSlice";
import { RootState } from "../../../interfaces/RootState";
export function TasksTable() {
  const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task);

  const getStatusSeverity = (status: string) => {
    switch (status.toUpperCase()) {
      case "IN PROGRESS":
        return "info";
      case "PENDING":
        return "warning";
      case "BLOCKED":
        return "danger";
      case "COMPLETED":
        return "success";
      default:
        return null;
    }
  };
  const statusBodyTemplate = (task: Task) => {
    return (
      <Tag value={task.status} severity={getStatusSeverity(task.status)}></Tag>
    );
  };
  const getCategorySeverity = (category: string) => {
    switch (category.toUpperCase()) {
      case "WORK":
        return "info";
      case "PERSONAL":
        return "warning";
      case "BLOCKED":
        return "danger";
      case "COMPLETED":
        return "success";
      default:
        return null;
    }
  };
  const categoryBodyTemplate = (task: Task) => {
    return (
      <Tag
        value={task.category}
        severity={getCategorySeverity(task.category)}
      ></Tag>
    );
  };
  const getPrioritySeverity = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "HIGH":
        return "danger";
      case "MEDIUM":
        return "warning";
      case "LOW":
        return "info";
    }
  };
  const priorityBodyTemplate = (task: Task) => {
    return (
      <Tag
        value={task.priority}
        severity={getPrioritySeverity(task.priority)}
      ></Tag>
    );
  };
  useEffect(() => {
    GetTasks()
      .then((response) => {
        dispatch(setTasks(response.data));
      })
      .catch((err) => {
        console.error("API request error:", err);
      });
  }, []);
  return (
    <div className="card" style={{ width: "80vw", overflowX: "auto" }}>
      <DataTable
        header={
          <TasksHeader
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
            setFilters={setFilters}
          />
        }
        value={tasks}
        size="small"
        // filters={filters}
        dataKey="id"
        showGridlines
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        selectionMode="checkbox"
        // dragSelection
        selection={selectedTasks!}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        sortMode="single"
        // sortField="assigned_time"
        // sortOrder={-1}
        tableStyle={{ maxWidth: "80vw", minWidth: "80vw", fontSize: "14px" }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column
          field="category"
          header="Category"
          body={categoryBodyTemplate}
        />
        <Column field="title" header="Title" />
        <Column
          field="priority"
          header="Priority"
          body={priorityBodyTemplate}
        />
        <Column field="dueDate" header="due Date" />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column field="description" header="Description" />
      </DataTable>
    </div>
  );
}
