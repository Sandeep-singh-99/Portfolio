import axios from 'axios';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/v1/skill'


export const useSkillStore = create()(
    devtools((set) => ({
        skillData: null,
        isLoading: false,
        isError: false,
        isDeleteLoading: false,

        fetchSkillData: async () => {
            set({ isLoading: true });
            try {
                const response = await axios.get(`${API_URL}/get-skills`)
                const skillData = response.data.data;
                set({ skillData, isLoading: false, isError: false });
            } catch (error) {
                set({ isError: true, isLoading: false });
            }
        },

        deleteSkill: async (_id: string) => {
            set({ isDeleteLoading: true });
            try {
                const response = await axios.delete(`${API_URL}/delete-skill/${_id}`)
                if (response.status === 200) {
                    set((state) => ({
                        skillData: state.skillData.filter((item) => item._id !== _id),
                        isDeleteLoading: false,
                        isError: false
                    }));
                } else {
                    set({ isError: true, isDeleteLoading: false });
                }
            } catch (error) {
                set({ isDeleteLoading: false });
            }
        },

        addSkill: async (formData: FormData) => {
            set({ isLoading: true });
            try {
                const response = await axios.post(`${API_URL}/create-skill`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response.status === 201) {
                    set((state) => ({
                        skillData: [...state.skillData, response.data.data],
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
)