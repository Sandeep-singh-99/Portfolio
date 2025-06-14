import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/v1/intro'

export const useIntroStore = create()(
    devtools((set) => ({
        introData: null,
        isLoading: false,
        isDeleteLoading: false,
        isError: false,

        fetchIntroData: async () => {
            set({ isLoading: true })
            try {
                const response = await axios.get(`${API_URL}/get-intro`);
                const introData = response.data.data
                set({ introData, isLoading: false, isError: false });
            } catch (error) {
                set({ isError: true, isLoading: false })
            }
        },
        
        deleteIntro: async (_id: string) => {
            set({ isDeleteLoading: true });
            try {
                const response = await axios.delete(`${API_URL}/delete-intro/${_id}`)
                if (response.status === 200) {
                    set((state) => ({
                        introData: state.introData.filter((item) => item._id !== _id),
                        isLoading: false,
                        isError: false
                    }));
                } else {
                    set({ isError: true, isDeleteLoading: false });
                }
            } catch (error) {
                set({ isError: true, isDeleteLoading: false });
            }
        },


        addIntro: async (formData: FormData) => {
            set({ isLoading: true });
            try {
                const response = await axios.post(`${API_URL}/create-intro`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (response.status === 201) {
                    set((state) => ({
                        introData: [...state.introData, response.data.data],
                        isLoading: false,
                        isError: false
                    }));
                } else {
                    set({ isError: true, isLoading: false });
                }
            } catch (error) {
                set({ isError: true, isLoading: false });
            }
        }
    }))
);