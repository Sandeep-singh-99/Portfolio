import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/v1/about'


export const useAboutStore = create()(
    devtools((set) => ({
        aboutData: null,
        isLoading: false,
        isError: false,
        isDeleteLoading: false,

        fetchAboutData: async () => {
            set({ isLoading: true, isError: false });
            try {
                const response = await axios.get(`${API_URL}/get-about`);
                set({ aboutData: response.data.data, isLoading: false, isError: false });
            } catch (error) {
                set({ isLoading: false, isError: true });
            }
        },

        addAbout: async (formData: FormData) => {
            set({ isLoading: true, isError: false })
            try {
                const response = await axios.post(`${API_URL}/create-about`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response.status === 201) {
                    set((state) => ({
                        aboutData: [...state.aboutData, response.data.data],
                        isLoading: false,
                        isError: false
                    }));
                } else {
                    set({ isLoading: false, isError: true });
                }
            } catch (error) {
                set({ isLoading: false, isError: true });
            }
        },

        deleteAbout: async (_id: string) => {
            set({ isDeleteLoading: true, isError: false });
            try {
                const response = await axios.delete(`${API_URL}/delete-about/${_id}`)
                if (response.status === 200) {
                    set((state) => ({
                        aboutData: state.aboutData.filter((item) => item._id !== _id),
                        isLoading: false,
                        isError: false
                    }));
                } else {
                    set({ isDeleteLoading: false, isError: true });
                }
            } catch (error) {
                set({ isDeleteLoading: false, isError: true });
            }
        },

        
    }))
);