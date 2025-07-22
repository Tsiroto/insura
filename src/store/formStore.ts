import { create } from 'zustand';
import type { FormFields } from '../types/form';

interface FormState {
    type: string;
    step: number;
    data: FormFields;
    setType: (type: string) => void;
    setStep: (step: number) => void;
    updateData: (newData: Partial<FormFields>) => void;
    reset: () => void;
}

export const useFormStore = create<FormState>((set) => ({
    type: '',
    step: 0,
    data: {},
    setType: (type) => set({ type }),
    setStep: (step) => set({ step }),
    updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
    reset: () => set({ type: '', step: 0, data: {} }),
}));
