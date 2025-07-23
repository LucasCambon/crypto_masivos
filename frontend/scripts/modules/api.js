export async function fetchCurrencies() {
	try {
		const response = await fetch('/api/v1/currencies/list');
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
	}
}

export async function fetchUsers() {
	try {
		const response = await fetch('/api/v1/users/list');
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Failed to load users:', error);
		return [];
	}
}
