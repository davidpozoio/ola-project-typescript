import { ENV } from "../consts/const";
import axios from "../interceptors/axios-interceptor";
import { ResultGetDto, ResultPostDto } from "../models/result";

export function getAllResults() {
  return axios.get<ResultGetDto[]>(`${ENV.BACKEND_ROUTE}/results`);
}
export function addNewResponse(result: ResultPostDto) {
  return axios.post<ResultGetDto>(`${ENV.BACKEND_ROUTE}/results`, result);
}
