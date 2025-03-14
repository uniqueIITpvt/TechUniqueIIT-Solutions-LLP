import { api } from '@/services/api';

export const checkApiConnection = async () => {
  try {
    const response = await api.get('/');
    console.log('API Connection successful:', response.data);
    return true;
  } catch (error) {
    console.error('API Connection failed:', error);
    return false;
  }
}; 