import { apiRequest } from '../utils/api-helpers.js';

export async function getWallet() {
  try {
    const response = await apiRequest('/api/v1/wallets/list', {
      method: 'GET',
      requireAuth: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
