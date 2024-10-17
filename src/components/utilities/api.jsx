import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

export const postRequest = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};

export const putRequest = async (endpoint, data) => {
    try {
        const response = await axios.put(`${API_URL}${endpoint}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error('Error during POST request:', error);
        throw error;
    }
};

export const getRequest = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error('Error during GET request:', error);
        throw error;
    }
};

export const deleteRequest = async (endpoint) => {
    try {
        const response = await axios.delete(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response;
    } catch (error) {
        console.error('Error during DELETE request:', error);
        throw error;
    }
};
