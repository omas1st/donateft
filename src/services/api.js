import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Campaign endpoints
export const getCampaign = () => api.get('/campaign');
export const updateCampaign = (data) => api.put('/campaign', data);

// Donation endpoints
export const createDonation = (donationData) => api.post('/donations', donationData);
export const getAllDonations = () => api.get('/donations');

export default api;