import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { NetworkConfig } from '../../config/NetworkConfig';
import { useProgressStore } from '@ccp-dashboard/shared-ui';

export interface Version {
    date: string;
    versionLabel: string;
    size: string;
}

export interface ProductItem {
    itemId: string;
    fileName: string;
    size: string;
    modifiedDate: string;
    versionLabel: string;
    jsonData: string;
    hasVersions: boolean;
    versions: ProductItem[];
}

export interface Product {
    productId: string;
    authorName: string;
    productItems: ProductItem[];
}

export interface ProductState extends Product {
    setProduct: (product: Product) => void;
    fetchProductDataById: (id: string) => void;
    fetchProductVersionDataById: (id: string) => void;
    fetchAndDownloadProductItem: (id: string) => void;
    clearProduct: () => void;
}

export const productStore: StateCreator<ProductState> = (set) => {
    return ({
        productId: '',
        authorName: '',
        productItems: [],

        setProduct: (product) => set(state => ({ ...state, ...product })),

        fetchProductDataById: async (id) => {
            console.log('fetchProductDataById----', id);
            try {
                useProgressStore.getState().toggleProgressBarVisibility(true);
                const response = await NetworkConfig.getApiClient()(`/contents/product?productionId=${id}`);
                console.log('response.data------', response.data);
                const transformedData = response.data;
                useProductStore.getState().setProduct(transformedData);
                useProgressStore.getState().toggleProgressBarVisibility(false);
            } catch (error) {
                useProgressStore.getState().toggleProgressBarVisibility(false);
                console.error('There was an error fetching the data:', error);
            }
        },

        fetchProductVersionDataById: async (id) => {
            console.log('fetchProductVersionDataById----', id);
            const productItem = useProductStore.getState().productItems.find(item => item.itemId === id);
            if (productItem?.versions && productItem.versions.length > 0) {
                console.log('Versions already present for item:', id);
                return;
            }

            try {
                useProgressStore.getState().toggleProgressBarVisibility(true);
                const response = await NetworkConfig.getApiClient()(`/contents/${id}/versions`);
                console.log('Version response.data------', response.data);
                const versions = response.data;

                set(state => {
                    const productItems = state.productItems.map(item => {
                        if (item.itemId === id) {
                            return { ...item, versions };
                        }
                        return item;
                    });
                    return { ...state, productItems };
                });

                useProgressStore.getState().toggleProgressBarVisibility(false);
            } catch (error) {
                useProgressStore.getState().toggleProgressBarVisibility(false);
                console.error('There was an error fetching the data:', error);
            }
        },

        fetchAndDownloadProductItem: async (itemId: string) => {
            try {
                console.log('fetchAndDownloadProductItem----', itemId);
                useProgressStore.getState().toggleProgressBarVisibility(true);
                const response = await NetworkConfig.getApiClient()(`/contents/download/${itemId}`);

                const downloadUrl = response.data;
                window.open(downloadUrl, '_blank');
            } catch (error) {
                console.error('Error fetching download URL:', error);
            } finally {
                useProgressStore.getState().toggleProgressBarVisibility(false);
            }
        },

        clearProduct: () => set(() => ({ productId: '', authorName: '', productItems: [] })) // Implement the clearProduct method

    });
};



export const useProductStore = create<ProductState>()(devtools(productStore));
