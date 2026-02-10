import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust based on your backend port

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const requestOTP = async (email) => {
    const response = await axios.post(`${API_URL}/send-otp`, { email });
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await axios.post(`${API_URL}/verify-otp`, data);
    return response.data;
};