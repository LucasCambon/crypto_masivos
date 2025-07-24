import { fetchCurrencies } from '../api/currency-api.js';
import { createCurrency } from '../features/currency/currency-card.js';
import { addLoginRegisterEventHandlers } from '../features/auth/auth-handlers.js';

async function loadCurrencies() {
	try {
		const data = await fetchCurrencies();
		const currencyList = document.querySelector('.currencies');

		if (!currencyList) return;

		data.slice(0, 7).forEach((currency) => {
			currencyList.insertBefore(
				createCurrency(currency),
				currencyList.firstChild
			);
		});
	} catch (error) {
		console.error('Failed to load data:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	loadCurrencies();
	addLoginRegisterEventHandlers();
});
