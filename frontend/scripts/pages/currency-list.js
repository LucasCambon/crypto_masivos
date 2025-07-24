import { fetchCurrencies } from '../api/currency-api.js';
import { renderCurrencies } from '../utils/currency-helpers.js';
import { setCurrencies } from '../features/currency/currency-converter.js';
import { addCurrencyButtons } from '../features/currency/convert-button.js';
import { addLoginRegisterEventHandlers } from '../features/auth/auth-handlers.js';

async function loadAllCurrencies() {
	try {
		const currencies = await fetchCurrencies();
		const container = document.querySelector('.currencies');

		if (!container) return;

		setCurrencies(currencies);
		renderCurrencies(currencies, container, { insertPosition: 'prepend' });

		addCurrencyButtons();

		// Watch for dynamic currency additions
		const observer = new MutationObserver(addCurrencyButtons);
		observer.observe(container, { childList: true });
	} catch (error) {
		console.error('Failed to load currencies:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	loadAllCurrencies();
	addLoginRegisterEventHandlers();
});
