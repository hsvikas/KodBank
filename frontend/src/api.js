import axios from 'axios';

// Base URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'https://kodbank-0qna.onrender.com';

console.log('🔧 Initializing API client...');
console.log(`📡 API Base URL: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(request => {
  console.log('📤 Starting Request:', request);

  const token = localStorage.getItem('token');
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }

  return request;
});

// Response interceptor
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

// 🔐 Auth APIs
export const register = (userData) =>
  api.post('/api/auth/register', userData);

export const login = (credentials) =>
  api.post('/api/auth/login', credentials);

export const logout = () =>
  api.post('/api/auth/logout');

// 👤 User APIs
export const getBalance = () =>
  api.get('/api/user/balance');

export const getProfile = () =>
  api.get('/api/user/profile');

// 🤖 ✅ CHATBOT API (IMPORTANT FIX)
export const sendMessage = (message) =>
  api.post('/api/chat', { message });

export default api;