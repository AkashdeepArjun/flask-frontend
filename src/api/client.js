import axios from "axios";

const api = axios.create({
    baseURL:"/api",
    withCredentials:true,
    headers:{

        "Content-Type": "application/json"

    }

});
// Interceptor to handle FormData uploads seamlessly
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Delete the hardcoded json header so the browser sets multipart/form-data + boundary
    delete config.headers['Content-Type'];
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});




export default api