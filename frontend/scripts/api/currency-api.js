/**
 * Currency API functions
 */

export async function fetchCurrencies() {
	try {
		const response = await fetch('/api/v1/currencies/list');
		const result = await response.json();
		return result.data.sort((a, b) => a.id - b.id);
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
	}
}

export async function createCurrency(currencyData) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(currencyData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to create currency');
		}

		const data = await response.json();
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
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(currencyData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to update currency');
		}

		const data = await response.json();
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
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				id: currencyId,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to delete currency');
		}

		const data = await response.json();
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
