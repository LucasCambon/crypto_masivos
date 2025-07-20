import { showConverterDialog } from './dialog.js';

export function addCurrencyButtons() {
	document.querySelectorAll('.currency').forEach((currencyDiv) => {
		const symbolElement = currencyDiv.querySelector('.currency-symbol');
		const nameElement = currencyDiv.querySelector('.currency-name');
		const valueElement = currencyDiv.querySelector('.currency-usd-value');

		if (!symbolElement || !nameElement || !valueElement) return;

		const symbol = symbolElement.textContent;
		const name = nameElement.textContent;
		const usdValueText = valueElement.textContent;
		const usdValue = parseFloat(usdValueText.replace(/[^0-9.]/g, ''));

		const currency = {
			symbol: symbol,
			name: name,
			usd_value: usdValue,
		};

		const valueContainer = currencyDiv.querySelector('.currency-value');
		if (!valueContainer) return;

		if (valueContainer.querySelector('.currency-btn')) return;

		const button = document.createElement('button');
		button.classList.add('primary', 'currency-btn');
		button.textContent = 'Convertir';

		button.addEventListener('click', () => {
			showConverterDialog(currency);
		});

		valueContainer.appendChild(button);
	});
}
