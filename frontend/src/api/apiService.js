import axios from 'axios';

// Create an Axios instance with the base URL from environment variables
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// --- Request Interceptor (Existing Code) ---
// Add a request interceptor to attach the JWT token to headers for protected routes.
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

// --- New Response Interceptor for Error Handling ---
apiService.interceptors.response.use(
  // If the response is successful (status code 2xx), pass it through.
  (response) => {
    return response;
  },
  // If there's an error in the response.
  (error) => {
    // Check if the error status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // 1. Clear user data and token from local storage.
      // This matches the logic in your logoutAction from AuthContext.
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      // 2. Redirect to the login page.
      // Using window.location.href ensures a full page reload, clearing all
      // React state and forcing re-evaluation of protected routes.
      if (window.location.pathname !== '/login') {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
    }

    // Return the error so it can be caught by the component making the request if needed.
    return Promise.reject(error);
  }
);

export default apiService;