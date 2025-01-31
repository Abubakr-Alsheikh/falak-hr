import { clearTokens } from '@utils/auth';
import { Credentials, Tokens } from '@/types/auth';

const BASE_URL = 'http://localhost:8000/api';

export const login = async (credentials: Credentials): Promise<Tokens> => {
    try {
        const response = await fetch(`${BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                throw new Error(`خطأ في اسم المستخدم أو كلمة المرور. يرجى المحاولة مرة أخرى`);
            } else {
                throw new Error(errorData.detail || `Login failed with status code: ${response.status}. Please try again later.`);
            }
        }

        const data: Tokens = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message || 'Login failed. An unexpected error occurred.');
    }
};

export const refreshAccessToken = async (refreshToken: string | null): Promise<string> => {
    if (!refreshToken) {
        throw new Error('No refresh token available.');
    }
    try {
        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                throw new Error('Session expired. Please log in again.');
            } else {
                throw new Error(errorData.detail || `Failed to refresh access token with status code: ${response.status}.`);
            }
        }

        const data: { access: string } = await response.json();
        return data.access;
    } catch (error: any) {
        clearTokens();
        throw new Error(error.message || 'Failed to refresh access token. Please log in again.');
    }
};

export const logout = async () => {
    // Optional: Backend logout endpoint call (if needed, as discussed previously)
    clearTokens(); // Clear tokens on the client side
};