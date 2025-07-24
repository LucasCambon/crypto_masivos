import { fetchCurrencies } from '../api/currency-api.js';
import { createCurrency } from '../features/currency/currency-card.js';
import { setCurrencies } from '../features/currency/currency-converter.js';
import { addCurrencyButtons } from '../features/currency/convert-button.js';
import { addLoginRegisterEventHandlers } from '../features/auth/auth-handlers.js';

async function loadCurrencies() {
	try {
		const data = await fetchCurrencies();
		const currencyList = document.querySelector('.currencies');
		if (!currencyList) return;

		setCurrencies(data);

		data.forEach((currency) => {
			currencyList.insertBefore(
				createCurrency(currency),
				currencyList.firstChild
			);
		});

		addCurrencyButtons();

		const observer = new MutationObserver(addCurrencyButtons);
		observer.observe(document.getElementById('currencies'), {
			childList: true,
		});
	} catch (error) {
		console.error('Failed to load data:', error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	loadCurrencies();
	addLoginRegisterEventHandlers();
});
