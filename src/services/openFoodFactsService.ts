import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

export const searchProducts = async (query: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                search_terms: query,
                search_simple: 1,
                action: 'process',
                json: 1,
                page_size: 10
            }
        });
        console.log('API response:', response.data); // Debug log
        return response.data.products.map(product => ({
            ...product,
            product_volume: product.product_volume || 'N/A', // Ensure product_volume is always present
        })) || [];
    } catch (error) {
        console.error('Error fetching data from OpenFoodFacts API', error);
        throw error;
    }
};

export const fetchProductDetails = async (barcode: string) => {
    try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        if (response.data.status === 1 && response.data.product) {
            return response.data.product;
        } else {
            console.log(`No product found for barcode: ${barcode}`);
            return null; // Return null if no product is found
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null; // Ensure to return null on error to handle gracefully
    }
};

