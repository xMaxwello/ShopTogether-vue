import { defineStore } from 'pinia';
import { fetchProductDetails } from '@/services/openFoodFactsService';

export const useProductDetailsStore = defineStore('productDetails', {
    state: () => ({
        productDetails: null,
    }),
    actions: {
        async fetchProductDetails(barcode) {
            this.productDetails = null; // Clear previous details
            if (barcode) {
                try {
                    const details = await fetchProductDetails(barcode);
                    this.productDetails = details;
                } catch (error) {
                    console.error('Failed to fetch product details:', error);
                }
            }
        },
        setManualProductDetails(details) {
            this.productDetails = details;
        },
        clearProductDetails() {
            this.productDetails = null;
        }
    }
});
