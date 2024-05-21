import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { FormGetDto, FormPostDto } from "../models/form";

export function getAllForms() {
  return axios.get<{ form_schemes: FormGetDto[] }>(
    `${ENV.BACKEND_ROUTE}/form-schemes`
  );
}

export function saveForm(form: FormPostDto) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms`, form);
}

export function getMyForms() {
  return axios.get(`${ENV.BACKEND_ROUTE}/forms`);
}

export function generateLink(id: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/generate-link`, { id });
}

export function invalidateLink(id: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/invalidate-link`, { id });
}

export function setExpireTime(time: number, formId: number) {
  return axios.post(`${ENV.BACKEND_ROUTE}/forms/expire-time`, {
    expire_hash_time: time,
    id: formId,
  });
}
