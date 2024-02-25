import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const reqresService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (email: string, password: string) => {
    try {
      const response = await reqresService.post('/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  },

  signup: async (email: string, password: string) => {
    try {
      const response = await reqresService.post('/register', { email, password });

      if (response.data.token) {
        return response.data.token;
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error: any) {
      throw error?.response?.data;
    }
  },

  getUserData: async (userId: number) => {
    try {
      const response = await reqresService.get(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data;
    }
  },
};

export default reqresService;
