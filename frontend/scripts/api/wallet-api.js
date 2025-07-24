import { apiRequest } from '../utils/api-helpers.js';

export async function fetchWallets() {
	try {
		const response = await apiRequest('/api/v1/wallets/list', {
			requireAuth: true,
		});
		return response.data || [];
	} catch (error) {
		console.error('Failed to fetch wallets:', error);
		return [];
	}
}

export async function createWallet(walletData) {
	try {
		const data = await apiRequest('/api/v1/wallets/create', {
			method: 'POST',
			requireAuth: true,
			body: JSON.stringify(walletData),
		});

		return {
			success: true,
			data,
			wallet: data.data,
		};
	} catch (error) {
		console.error('Failed to create wallet:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function updateWallet(walletData) {
	try {
		const data = await apiRequest('/api/v1/wallets/update', {
			method: 'PUT',
			requireAuth: true,
			body: JSON.stringify(walletData),
		});

		return {
			success: true,
			data,
			wallet: data.data,
		};
	} catch (error) {
		console.error('Failed to update wallet:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function deleteWallet(walletId) {
	try {
		const data = await apiRequest('/api/v1/wallets/delete', {
			method: 'DELETE',
			requireAuth: true,
			body: JSON.stringify({ id: walletId }),
		});

		return {
			success: true,
			data,
			wallet: data.data,
		};
	} catch (error) {
		console.error('Failed to delete wallet:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}
