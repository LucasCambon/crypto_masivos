import { showConverterDialog } from '../../components/dialog-manager.js';
import { createElement } from '../../utils/dom-helpers.js';

function extractCurrencyData(currencyDiv) {
	const symbolElement = currencyDiv.querySelector('.currency-symbol');
	const nameElement = currencyDiv.querySelector('.currency-name');
	const valueElement = currencyDiv.querySelector('.currency-usd-value');

	if (!symbolElement || !nameElement || !valueElement) return null;

	const symbol = symbolElement.textContent;
	const name = nameElement.textContent;
	const usdValueText = valueElement.textContent;
	const usdValue = parseFloat(usdValueText.replace(/[^0-9.]/g, ''));

	return { symbol, name, usd_value: usdValue };
}

function createConvertButton(currency) {
	const button = createElement('button', 'primary currency-btn', 'Convertir');

	button.addEventListener('click', () => {
		showConverterDialog(currency);
	});

	return button;
}

export function addCurrencyButtons() {
	document.querySelectorAll('.currency').forEach((currencyDiv) => {
		const currency = extractCurrencyData(currencyDiv);
		if (!currency) return;

		const valueContainer = currencyDiv.querySelector('.currency-value');
		if (!valueContainer) return;

		// Skip if button already exists
		if (valueContainer.querySelector('.currency-btn')) return;

		const button = createConvertButton(currency);
		valueContainer.appendChild(button);
	});
}
