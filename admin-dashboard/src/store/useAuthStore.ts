import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/v1/user'

interface IAuth {
    __typename: string;
    _id: string;
    username: string;
}

interface AuthStore {
    user: IAuth | null;
    isError: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (data: { username: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    devtools((set, get) => ({
        user: null,
        isError: false,
        isLoading: false,

        checkAuth: async () => {
            set({ isLoading: true }, false, 'checkAuth/start');
            try {
                const response = await axios.get(`${API_URL}/check-auth`, {
                    withCredentials: true
                });
                const user: IAuth = response.data.data;
                set({ user: user, isError: false, isLoading: false });
            } catch (error) {
                set({ isError: true, isLoading: false }, false, 'checkAuth/error');
            }
        },

        login: async (data: { username: string; password: string }) => {
            set({ isLoading: true }, false, 'login/start');
            try {
                const response = await axios.post(`${API_URL}/login`, data);
                const user: IAuth = response.data.user;
                set({ user, isError: false, isLoading: false }, false, 'login/success');
            } catch (error) {
                set({ isError: true, isLoading: false }, false, 'login/error');
            }
        }
    }))
    );