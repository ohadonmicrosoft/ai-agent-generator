import axios, { 
  AxiosError, 
  InternalAxiosRequestConfig,
  AxiosResponse 
} from 'axios';
import { auth } from './firebase';
import toast from 'react-hot-toast';

interface ApiErrorResponse {
  message: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message || 'An error occurred';
    
    switch (error.response?.status) {
      case 401:
        // Handle unauthorized
        auth.signOut();
        window.location.href = '/signin';
        break;
      case 403:
        // Handle forbidden
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        // Handle not found
        toast.error('Resource not found');
        break;
      case 429:
        // Handle rate limit
        toast.error('Too many requests. Please try again later');
        break;
      default:
        // Handle other errors
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient; 