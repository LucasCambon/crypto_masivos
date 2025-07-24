import { apiRequest } from '../utils/api-helpers.js';

export async function fetchCurrencies() {
	try {
		const result = await apiRequest('/api/v1/currencies/list');
		return result.data.sort((a, b) => a.id - b.id);
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
	}
}

export async function createCurrency(currencyData) {
	try {
		const data = await apiRequest('/api/v1/currencies/create', {
			method: 'POST',
			requireAuth: true,
			body: JSON.stringify(currencyData),
		});

		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to create currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function updateCurrency(currencyData) {
	try {
		const data = await apiRequest('/api/v1/currencies/update', {
			method: 'PUT',
			requireAuth: true,
			body: JSON.stringify(currencyData),
		});

		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to update currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function deleteCurrency(currencyId) {
	try {
		const data = await apiRequest('/api/v1/currencies/delete', {
			method: 'DELETE',
			requireAuth: true,
			body: JSON.stringify({ id: currencyId }),
		});

		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to delete currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}
