import axios from 'axios';
import { clearTokens, getRefreshToken, setTokens } from '@utils/auth';
import { Credentials, Tokens } from '@/types/auth';

const BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000, // optional timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // prevent infinite loops
            const refreshToken = getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
                    const { access: newAccessToken } = response.data;
                    const oldRefreshToken = getRefreshToken(); // keep old refresh token
                    setTokens(newAccessToken, oldRefreshToken || '', true); // Assuming rememberMe is always true for refresh
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // Update axios default header
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Retry the original request with new access token
                    return axiosInstance(originalRequest); // important to return the axios call
                } catch (refreshError) {
                    // Refresh token is also likely expired or invalid
                    clearTokens();
                    window.location.href = '/login'; // Redirect to login page
                    return Promise.reject(refreshError); // Reject the promise to propagate the error
                }
            } else {
                // No refresh token available, redirect to login
                clearTokens();
                window.location.href = '/login';
            }
        }

        return Promise.reject(error); // if error is not 401 or refresh fails, reject as is
    }
);


export const login = async (credentials: Credentials): Promise<Tokens> => {
    try {
        const response = await axiosInstance.post('/token/', credentials);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new Error(`خطأ في اسم المستخدم أو كلمة المرور. يرجى المحاولة مرة أخرى`);
        } else {
            throw new Error(error.response?.data?.detail || `Login failed with status code: ${error.response?.status}. Please try again later.`);
        }
    }
};

export const refreshAccessTokenFn = async (refreshToken: string | null): Promise<string> => { // Renamed to avoid confusion, not directly used now, but can be kept for explicit refresh calls if needed
    if (!refreshToken) {
        throw new Error('No refresh token available.');
    }
    try {
        const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
        const data: { access: string } = response.data;
        return data.access;
    } catch (error: any) {
        clearTokens();
        throw new Error(error.message || 'Failed to refresh access token. Please log in again.');
    }
};

export const logout = async () => {
    // Optional: Backend logout endpoint call (if needed)
    clearTokens(); // Clear tokens on the client side
    window.location.href = '/login'; // Redirect to login after logout
};

export default axiosInstance; // Export the axiosInstance to be used in other API files