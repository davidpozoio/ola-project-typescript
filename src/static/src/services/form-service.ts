import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormPostDto } from "../models/form";

export function getAllForms() {
  return axios.get(`${ENV.BACKEND_ROUTE}/forms`);
}

export function saveForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}
