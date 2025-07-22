import { create } from 'zustand';

interface FormState {
    type: string;
    step: number;
    data: Record<string, any>;
    setType: (type: string) => void;
    setStep: (step: number) => void;
    updateData: (newData: Record<string, any>) => void;
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
