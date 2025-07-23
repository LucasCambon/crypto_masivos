const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000'
  : 'https://crypto-masivos.onrender.com';

export async function fetchCurrencies() {
	try {
		const response = await fetch(`${API_BASE_URL}/api/v1/currencies/list`);
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
	}
}
