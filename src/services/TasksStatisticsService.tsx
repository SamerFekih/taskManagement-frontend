import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const GetTasksStatistics = async () => {
  const token = sessionStorage.getItem("token");
  let config = {
    method: "get",
    url: `${apiUrl}/statistics/tasks-status`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.request(config);
};
