import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const GetTasksStatusStatistics = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `${apiUrl}/statistics/status`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config);
};

export const GetTasksPriorityStatistics = async () => {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    url: `${apiUrl}/statistics/priority-per-category`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config);
};
