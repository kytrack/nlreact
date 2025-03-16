// utils/ApiClient.ts
import axios from 'axios';

const API_BASE_URL = 'https://nlapi.azurewebsites.net/api/';
const FUNCTION_KEY = 'aAu_h-FyLYsh4XVBDEzVINgS5hgYEKjgNNrMzq9PSopoAzFuWxFudQ==';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(config => {
  // Function key hozzáadása CSAK a login végponthoz
  if (config.url?.includes('JWTLogin')) {
    config.params = { ...config.params, code: FUNCTION_KEY };
  }

  // JWT token hozzáadása minden más kéréshez
  const token = localStorage.getItem('jwtToken');
  if (token && !config.url?.includes('JWTLogin')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;