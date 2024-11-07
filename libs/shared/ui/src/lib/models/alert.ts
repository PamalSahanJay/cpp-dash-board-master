import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export enum AlertSeverity {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success',
}

export interface AlertState {
    alertMessage: string;
    alertSeverity: AlertSeverity;
    setAlert: (message: string, severity: AlertSeverity) => void;
    clearAlert: () => void;
}

const alertStore: StateCreator<AlertState> = (set) => ({
    alertMessage: '',
    alertSeverity: AlertSeverity.INFO,
    setAlert: (message, severity = AlertSeverity.INFO) => {
        set({ alertMessage: message, alertSeverity: severity });
    },
    clearAlert: () => set({ alertMessage: '', alertSeverity: AlertSeverity.INFO })
});

export const useAlertStore = create<AlertState>()(devtools(alertStore));
