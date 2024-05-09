import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { LoginDto, SignupDto } from "../models/auth";

export function login(user: LoginDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/login`, user);
}

export function signup(user: SignupDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/signup`, user);
}
