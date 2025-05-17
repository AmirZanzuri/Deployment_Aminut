import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// Create an Axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Handle different HTTP status codes
      const status = error.response.status;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      if (status === 403) {
        // Forbidden - user doesn't have permission
        console.error('Permission denied');
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network error, no response received');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const api = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

// For development/testing without a backend
export const MOCK_MODE = true;

// Export the raw Axios instance if needed
export default apiClient;