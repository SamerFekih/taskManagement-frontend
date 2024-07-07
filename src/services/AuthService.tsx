import axios from "axios";
import { LoginFormData } from "../interfaces/auth/LoginFormDataProps";
import { RegisterFormData } from "../interfaces/auth/RegisterFormDataProps";

const apiUrl = import.meta.env.VITE_API_URL;

export const Login = async (formData: LoginFormData) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${apiUrl}/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: formData,
  };
  return axios.request(config);
};
export const Register = async (formData: RegisterFormData) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${apiUrl}/auth/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: formData,
  };
  return axios.request(config);
};
export const VerifyToken = () => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${apiUrl}/auth/verifyToken`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  return axios.request(config);
};
