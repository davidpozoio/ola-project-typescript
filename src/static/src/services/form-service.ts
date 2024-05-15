import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormGetDto, FormPostDto } from "../models/form";

export function getAllForms() {
  return axios.get<{ forms: FormGetDto[] }>(`${ENV.BACKEND_ROUTE}/forms`);
}

export function saveForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}
