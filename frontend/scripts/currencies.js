import { fetchCurrencies } from './modules/api.js';
import { createCurrency } from './modules/currency-ui.js';
import { setCurrencies } from './modules/conversor.js';
import { addCurrencyButtons } from './modules/currency-buttons.js';

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

document.addEventListener('DOMContentLoaded', loadCurrencies);
