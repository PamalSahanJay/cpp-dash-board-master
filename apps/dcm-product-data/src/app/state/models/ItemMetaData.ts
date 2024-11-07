import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ItemMetadataState {
    open: boolean;
    jsonData: any;
    openDialog: (data: any) => void;
    closeDialog: () => void;
}

export const ItemMetadataStore: StateCreator<ItemMetadataState> = (set) => {
    return ({
        open: false,
        jsonData: null,
        openDialog: (data) => {
            const parse = JSON.parse(data);
            set({ open: true, jsonData: parse });
        },

        closeDialog: () => {
            console.log('closeDialog');
            set({ open: false, jsonData: null })
        },
    });
};


export const useItemMetadataStore = create<ItemMetadataState>()(devtools(ItemMetadataStore));
