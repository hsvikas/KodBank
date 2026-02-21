import axios from 'axios';

// Use environment variable, localhost for development, or deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://kodbank-0qna.onrender.com/api';

console.log('🔧 Initializing API client...');
console.log(`📡 API Base URL: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Add request interceptor for logging
api.interceptors.request.use(request => {
  console.log('📤 Starting Request:', request);
  return request;
});

// Add response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log('✅ Response:', response);
    return response;
  },
  error => {
    console.error('❌ Error Response:', error.response || error);
    return Promise.reject(error);
  }
);

export const register = (userData) => {
  console.log('🔐 Calling register with:', userData);
  return api.post('/auth/register', userData);
};

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getBalance = () => {
  return api.get('/user/balance');
};

export const getProfile = () => {
  return api.get('/user/profile');
};

export default api;
