export async function fetchCurrencies() {
	return fetch('scripts/example/currencies.json')
		.then((response) => response.json())
		.catch((error) => {
			console.error('Failed to load currencies:', error);
			return [];
		});
}
