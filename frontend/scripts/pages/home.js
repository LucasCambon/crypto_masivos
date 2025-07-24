import { fetchCurrencies } from '../api/currency-api.js';
import { renderCurrencies } from '../utils/currency-helpers.js';
import { addLoginRegisterEventHandlers } from '../features/auth/auth-handlers.js';

async function loadHomeCurrencies() {
	try {
		const currencies = await fetchCurrencies();
		const container = document.querySelector('.currencies');

		renderCurrencies(currencies, container, {
			limit: 7,
			insertPosition: 'prepend',
		});
	} catch (error) {
		console.error('Failed to load currencies:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	loadHomeCurrencies();
	addLoginRegisterEventHandlers();
});
