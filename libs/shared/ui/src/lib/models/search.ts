import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface SearchType {
    name: SearchTypes;
    maxLength: number;
    pattern?: string;
    hint?: string;
}

export enum SearchTypes {
    PRODUCTION = 'PRODUCTION-ID',
    PRODUCT = 'PRODUCT-ID',
    DOI = 'DOI',
    ANY = 'ANY',
}

export const SearchTypeList: SearchType[] = [
    {
        name: SearchTypes.PRODUCTION,
        maxLength: 36,
        pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
        hint: '123e4567-e89b-12d3-a456-426614174000'
    },
    { name: SearchTypes.PRODUCT, maxLength: 8, pattern: '^[a-zA-Z0-9]*$', hint: '15028271' },
    {
        name: SearchTypes.DOI,
        maxLength: 10,
        pattern: '^\\d{2}\\.\\d{4}\\/[a-z]{3}\\.\\d{5}$',
        hint: '10.1111/jvh.15766'
    },
    { name: SearchTypes.ANY, maxLength: 25 }
];


export interface SearchState {
    searchTxt: string;
    searchType: SearchType;
    loading: boolean;
    fetchError: string;
    setSearchTxt: (value: string) => void;
    setSearchTxtAsync: (value: string) => Promise<void>;
    setSearchType: (value: SearchType) => void;
    setSearchTxtAndType: (txtValue: string, typeValue: SearchType) => void;
    clearSearchTxt: () => void;
}


const searchStore: StateCreator<SearchState> = (set, get) => ({
        searchTxt: '',
        searchType: SearchTypeList[0],
        loading: false,
        fetchError: '',

        setSearchTxt: (value) => {
            console.log('setSearchTxt------', value);
            set(state => ({ ...state, searchTxt: value }));
        },

        setSearchTxtAsync: async (value) => {
            set(state => ({ ...state, searchTxt: value }));
        },

        setSearchType: (value) => {
            set(state => ({ ...state, searchTxt: '', searchType: value }));
        },

        setSearchTxtAndType: (txtValue: string, typeValue: SearchType) => {
            set(state => ({ ...state, searchTxt: txtValue, searchType: typeValue }));
        },

        clearSearchTxt: () => set(() => ({ searchTxt: '' }))

    }
);

export const useSearchStore = create<SearchState>()(devtools(searchStore));
