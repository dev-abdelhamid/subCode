import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const ServicesAPI = {
  async getAllServices() {
    const response = await axios.get(`${API_BASE_URL}/services`);
    return response.data;
  },

  async getServiceById(id) {
    const response = await axios.get(`${API_BASE_URL}/services/${id}`);
    return response.data;
  }
};
