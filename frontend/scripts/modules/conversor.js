import { updateConversion } from './converter.js';

let allCurrencies = [];

export function setCurrencies(currencies) {
	allCurrencies = currencies;
}

export function createConversor(selectedCurrency) {
	const title = document.createElement('h2');
	title.classList.add('conversor-title');
	title.textContent = 'Conversor';

	const newForm = document.createElement('form');
	newForm.addEventListener('submit', (e) => e.preventDefault());

	const newConversor = document.createElement('div');
	newConversor.classList.add('conversor');

	// From
	const fromContainer = document.createElement('div');
	fromContainer.classList.add('conversor-input-group');

	const fromCurrencySelect = document.createElement('select');
	fromCurrencySelect.id = 'currency-from';
	fromCurrencySelect.classList.add('currency-select');

	// USD option
	const usdOption = document.createElement('option');
	usdOption.value = 'USD';
	usdOption.textContent = 'USD';
	usdOption.selected = true;
	fromCurrencySelect.appendChild(usdOption);

	allCurrencies.forEach((currency) => {
		const option = document.createElement('option');
		option.value = JSON.stringify(currency);
		option.textContent = `${currency.symbol} (${currency.name})`;
		fromCurrencySelect.appendChild(option);
	});

	const fromInput = document.createElement('input');
	fromInput.type = 'number';
	fromInput.name = 'from';
	fromInput.min = '0';
	fromInput.step = '0.01';
	fromInput.value = '1';
	fromInput.classList.add('currency-input');

	fromContainer.appendChild(fromInput);
	fromContainer.appendChild(fromCurrencySelect);

	// To
	const toContainer = document.createElement('div');
	toContainer.classList.add('conversor-input-group');

	const toCurrencySelect = document.createElement('select');
	toCurrencySelect.id = 'currency-to';
	toCurrencySelect.classList.add('currency-select');

	// USD option
	const usdOptionTo = document.createElement('option');
	usdOptionTo.value = 'USD';
	usdOptionTo.textContent = 'USD';
	toCurrencySelect.appendChild(usdOptionTo);

	allCurrencies.forEach((currency) => {
		const option = document.createElement('option');
		option.value = JSON.stringify(currency);
		option.textContent = `${currency.symbol} (${currency.name})`;

		if (selectedCurrency && currency.symbol === selectedCurrency.symbol) {
			option.selected = true;
		}

		toCurrencySelect.appendChild(option);
	});

	const toInput = document.createElement('input');
	toInput.type = 'number';
	toInput.name = 'to';
	toInput.min = '0';
	toInput.step = '0.000001';
	toInput.readOnly = true;
	toInput.classList.add('currency-input');

	toContainer.appendChild(toInput);
	toContainer.appendChild(toCurrencySelect);

	// Swap button
	const swapButton = document.createElement('button');
	swapButton.type = 'button';
	swapButton.classList.add('swap-btn');
	swapButton.textContent = '↔️';
	swapButton.title = 'Swap currencies';

	updateConversion(fromInput, toInput, fromCurrencySelect, toCurrencySelect);

	fromInput.addEventListener('input', () =>
		updateConversion(
			fromInput,
			toInput,
			fromCurrencySelect,
			toCurrencySelect
		)
	);

	fromCurrencySelect.addEventListener('change', () =>
		updateConversion(
			fromInput,
			toInput,
			fromCurrencySelect,
			toCurrencySelect
		)
	);

	toCurrencySelect.addEventListener('change', () =>
		updateConversion(
			fromInput,
			toInput,
			fromCurrencySelect,
			toCurrencySelect
		)
	);

	swapButton.addEventListener('click', () => {
		const tempFromValue = fromCurrencySelect.value;

		fromCurrencySelect.value = toCurrencySelect.value;
		toCurrencySelect.value = tempFromValue;

		updateConversion(
			fromInput,
			toInput,
			fromCurrencySelect,
			toCurrencySelect
		);
	});

	newConversor.appendChild(title);
	newForm.appendChild(fromContainer);
	newForm.appendChild(swapButton);
	newForm.appendChild(toContainer);
	newConversor.appendChild(newForm);

	return newConversor;
}
