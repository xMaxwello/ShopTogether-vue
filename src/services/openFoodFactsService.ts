import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org/api/v0';

export const searchProducts = async (query) => {
    try {
        console.log(`Searching for products: ${query}`); // Debug log
        const response = await axios.get(`${BASE_URL}/search.json?search_terms=${query}&page_size=10`);
        console.log('API response:', response.data); // Debug log
        return response.data.products || [];
    } catch (error) {
        console.error('Error fetching data from OpenFoodFacts API', error);
        throw error;
    }
};
