import axios from 'axios';

const API_URL = '/api/restaurants';

// RESTAURANTS

export const getRestaurants = async () => {
    const { data } = await axios.get(API_URL);
    return data;
};

export const getRestaurant = async (restaurantId) => {
    const { data } = await axios.get(`${API_URL}/${restaurantId}`);
    return data;
};

export const createRestaurant = async (restaurantData, token) => {
    const { data } = await axios.post(API_URL, restaurantData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const updateRestaurant = async (restaurantId, restaurantData, token) => {
    const { data } = await axios.put(
        `${API_URL}/${restaurantId}`,
        restaurantData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
};

export const deleteRestaurant = async (restaurantId, token) => {
    await axios.delete(`${API_URL}/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

// REVIEWS

export const addReview = async (restaurantId, reviewData, token) => {
    const { data } = await axios.post(
        `${API_URL}/${restaurantId}/reviews`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
};

export const updateReview = async (restaurantId, reviewId, reviewData, token) => {
    const { data } = await axios.put(
        `${API_URL}/${restaurantId}/reviews/${reviewId}`,
        reviewData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
};

export const deleteReview = async (restaurantId, reviewId, token) => {
    await axios.delete(
        `${API_URL}/${restaurantId}/reviews/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
};
