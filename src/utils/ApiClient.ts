import axios from 'axios';

const API_BASE_URL = 'https://nlapi.azurewebsites.net/api/';
const FUNCTION_KEY = 'aAu_h-FyLYsh4XVBDEzVINgS5hgYEKjgNNrMzq9PSopoAzFuWxFudQ==';
const GET_TODAY_PLANS_KEY = 's4F6CCgVxBNaqh-5PBAnJH6KwqEcfzeu9Vxm6g1rnLAvAzFuHvfBnw==';

const apiClient = axios.create({
baseURL: API_BASE_URL,
headers: {
'Content-Type': 'application/json'
}
});

// const apiClient2 = axios.create({
//   baseURL: API_BASE_URL,
//   headers: 
//   }
//   });

// Request interceptor
apiClient.interceptors.request.use(config => {
// Add function keys to specific endpoints
if (config.url?.includes('JWTLogin')) {
config.params = { ...config.params, code: FUNCTION_KEY };
} else if (config.url?.includes('GetTodayPlans')) {
config.params = { ...config.params, code: GET_TODAY_PLANS_KEY };
}

// JWT token for authenticated requests
const token = localStorage.getItem('jwtToken');
if (token && !config.url?.includes('JWTLogin')) {
config.headers.Authorization = `Bearer ${token}`;
}

return config;
});

// Response interceptor remains the same
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