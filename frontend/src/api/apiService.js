import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add a request interceptor to attach the JWT token to headers for protected routes.
// The token is retrieved from localStorage (where we'll store it after login).
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiService;