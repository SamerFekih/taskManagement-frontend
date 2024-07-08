import {
  DataTable,
  DataTableFilterMeta,
  DataTableRowEditCompleteEvent,
} from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { useEffect, useState } from "react";
import { GetTasks, UpdateTask } from "../../../services/TasksService";
import { Tag } from "primereact/tag";
import { Task } from "../../../interfaces/task/Task";
import { TasksHeader } from "./TasksHeader";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../../store/TaskSlice";
import { RootState } from "../../../interfaces/RootState";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { UpdateTaskRequest } from "../../../interfaces/task/UpdateTaskRequest";
import {
  getCategorySeverity,
  getPrioritySeverity,
  getStatusSeverity,
} from "../../../utils/TasksTableUtils";
export function TasksTable() {
  const statuses = ["Pending", "In Progress", "Blocked", "Completed"];
  const priorities = ["High", "Medium", "Low"];
  const [selectedTasks, setSelectedTasks] = useState<Task[] | null>(null);
  // const [filters, setFilters] = useState<DataTableFilterMeta>();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task);
  const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    let _tasks = [...tasks];
    let { newData, index } = e;
    const taskIndex = _tasks.findIndex((task) => task.id === newData.id);
    if (taskIndex !== -1) {
      _tasks.splice(taskIndex, 1);
    }
    _tasks.push(newData as Task);
    dispatch(setTasks(_tasks));
    const { id, status, priority } = newData as UpdateTaskRequest;
    const updatedTask: UpdateTaskRequest = {
      id,
      status,
      priority,
    };

    UpdateTask(updatedTask)
      .then((response) => {
        // alert("task updated successfully");
      })
      .catch((err) => {
        console.error("API request error:", err);
      });
  };

  const statusBodyTemplate = (task: Task) => {
    return (
      <Tag value={task.status} severity={getStatusSeverity(task.status)}></Tag>
    );
  };

  const categoryBodyTemplate = (task: Task) => {
    return (
      <Tag
        value={task.category}
        severity={getCategorySeverity(task.category)}
      ></Tag>
    );
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
  const priorityEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        className="p-inputtext-sm"
        value={options.value}
        options={priorities}
        itemTemplate={(option) => {
          return (
            <Tag value={option} severity={getPrioritySeverity(option)}></Tag>
          );
        }}
        onChange={(e: DropdownChangeEvent) =>
          options?.editorCallback?.(e.value)
        }
      />
    );
  };
  const statusEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        className="p-inputtext-sm"
        value={options.value}
        options={statuses}
        itemTemplate={(option) => {
          return (
            <Tag value={option} severity={getStatusSeverity(option)}></Tag>
          );
        }}
        onChange={(e: DropdownChangeEvent) =>
          options?.editorCallback?.(e.value)
        }
      />
    );
  };
  return (
    <div className="card" style={{ width: "80vw", overflowX: "auto" }}>
      <DataTable
        header={
          <TasksHeader
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
            // setFilters={setFilters}
          />
        }
        value={tasks}
        size="small"
        // filters={filters}
        editMode="row"
        dataKey="id"
        showGridlines
        // paginator
        // rows={25}
        // rowsPerPageOptions={[25, 50]}
        selectionMode="checkbox"
        selection={selectedTasks!}
        onSelectionChange={(e) => setSelectedTasks(e.value)}
        sortMode="single"
        onRowEditComplete={onRowEditComplete}
        sortField="id"
        sortOrder={1}
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
          editor={(options) => priorityEditor(options)}
        />
        <Column field="dueDate" header="due Date" />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          editor={(options) => statusEditor(options)}
        />
        <Column field="description" header="Description" />
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        />
      </DataTable>
    </div>
  );
}
