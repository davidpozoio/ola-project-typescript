import axios from "axios";

axios.interceptors.request.use((request) => {
  request.withCredentials = true;

  return request;
});

axios.interceptors.response.use((response) => {
  if (response.status >= 300) {
    throw new Error(response.data);
  }

  return response;
});

export default axios;
