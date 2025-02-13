import { SubscriptionRequest } from '@/types/subscription';
import apiClient from './client';

const subscriptionService = {
    createSubscriptionRequest: async (data: SubscriptionRequest) => {
        try {
            const response = await apiClient.post('/subscriptions/', data);
            return response.data;  // Return the full response data
        } catch (error) {
            throw error; // Re-throw the error for handling in the component
        }
    },

    getSubscriptionRequests: async () => {  // For fetching all requests (admin/staff)
        try {
            const response = await apiClient.get('/subscriptions/');
            return response.data; // Return the full response data
        } catch (error) {
            throw error;
        }
    },
    // Add more methods as needed (e.g., getSubscriptionRequestById, updateSubscriptionRequest, etc.)
};

export default subscriptionService;