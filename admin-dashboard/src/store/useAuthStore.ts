import { create } from 'zustand';

interface IAuth {
    __typename: string;
    _id: string;
    username: string;
}

export const useAuthStore = create((set) => ({
    user: null,
    isError: false,
    isLoading: false,

    checkAuth: (data: IAuth) => set({ user: data }),

    isLoggedIn: (data: IAuth) => set({ user: data, isError: false, isLoading: false }),

    getUser: () => set((state) => ({ user: state.user })),

}))