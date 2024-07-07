import axios from "axios";
import { NewTaskRequest } from "../interfaces/task/NewTaskRequest";

const apiUrl = import.meta.env.VITE_API_URL;

export const GetTasks = async () => {
  const token = sessionStorage.getItem("token");
  let config = {
    method: "get",
    url: `${apiUrl}/task/getTasks`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config);
};
export const AddTask = async (task: NewTaskRequest) => {
  const token = sessionStorage.getItem("token");
  let data = JSON.stringify(task);
  let config = {
    method: "post",
    url: `${apiUrl}/task/addTask`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  return axios.request(config);
};
export const DeleteTasks = async (taskIds: String[]) => {
  const token = sessionStorage.getItem("token");
  let data = { taskIds: taskIds };
  let config = {
    method: "delete",
    url: `${apiUrl}/task/deleteTasks`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  return axios.request(config);
};
