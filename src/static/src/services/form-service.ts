import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormGetDto, FormPostDto } from "../models/form";

export function getAllForms() {
  return axios.get<{ form_schemes: FormGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/form-schemes`
  );
}

export function saveForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/form`, form);
}
