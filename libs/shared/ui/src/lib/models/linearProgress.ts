import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ProgressState {
    isProgressBarVisible: boolean;
    toggleProgressBarVisibility: (state: boolean) => void;
}

const progressStore: StateCreator<ProgressState> = (set) => ({
    isProgressBarVisible: false,
    toggleProgressBarVisibility: (state) => set({ isProgressBarVisible: state })
});

export const useProgressStore = create<ProgressState>()(devtools(progressStore));
