import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

export const searchProducts = async (query) => {
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
        console.log('API response:', response.data);
        return response.data.products || [];
    } catch (error) {
        console.error('Error fetching data from OpenFoodFacts API', error);
        throw error;
    }
};
