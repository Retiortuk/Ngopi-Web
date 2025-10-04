import { create } from 'zustand';
import apiClient from '../api/axiosConfig.js';
import toast from 'react-hot-toast';

export const useAdminOrderStore = create((set, get) => ({
    orders: [],
    isLoading: true,

    fetchOrders: async () => {
        set({ isLoading: true });
        try {
            const { data } = await apiClient.get('/orders/active-orders');
            set({ orders: data, isLoading: false });
        } catch (error) {
            console.error("Failed To Fetch:", error);
            toast.error("Failed To Fetch Orders.");
            set({ isLoading: false });
        }
    },

    fetchFutureOrders: async () => {
        set({ isLoading: true });
        try {
            const { data } = await apiClient.get('/orders/future-orders');
            set({ orders: data, isLoading: false });
        } catch (error) {
            console.error("Failed To Fetch:", error);
            toast.error("Failed To Fetch Orders.");
            set({ isLoading: false });
        }
    },

    addOrder: (newOrder) => {
        set((state) => ({
            orders: [newOrder, ...state.orders]
        }));
    },

    updateOrderStatusInStore: (orderId, newStatus) => {
        set((state) => ({
            orders: state.orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        }));
    }
}));
