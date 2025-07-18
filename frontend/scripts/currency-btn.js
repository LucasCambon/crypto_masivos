let allCurrencies = [];

function loadCurrencies() {
	fetch('scripts/example-data/currencies.json')
		.then((response) => response.json())
		.then((data) => {
			allCurrencies = data;
		})
		.catch((error) => console.error('Failed to load currencies:', error));
}

document.addEventListener('DOMContentLoaded', loadCurrencies);

function createConversor(selectedCurrency) {
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

function calculateConversion(amount, fromValue, toValue) {
	if (fromValue === toValue) {
		return amount;
	}

	let fromCurrency, toCurrency;

	if (fromValue !== 'USD') {
		try {
			fromCurrency = JSON.parse(fromValue);
		} catch (e) {
			console.error('Error parsing fromValue:', e);
			return 0;
		}
	}

	if (toValue !== 'USD') {
		try {
			toCurrency = JSON.parse(toValue);
		} catch (e) {
			console.error('Error parsing toValue:', e);
			return 0;
		}
	}

	// USD to crypto
	if (fromValue === 'USD' && toValue !== 'USD') {
		return (amount / toCurrency.usd_value).toFixed(6);
	}

	// Crypto to USD
	if (fromValue !== 'USD' && toValue === 'USD') {
		return (amount * fromCurrency.usd_value).toFixed(2);
	}

	// Crypto to crypto
	if (fromValue !== 'USD' && toValue !== 'USD') {
		const usdAmount = amount * fromCurrency.usd_value;
		return (usdAmount / toCurrency.usd_value).toFixed(6);
	}

	return 0;
}

function updateConversion(fromInput, toInput, fromSelect, toSelect) {
	const amount = parseFloat(fromInput.value) || 0;
	const fromValue = fromSelect.value;
	const toValue = toSelect.value;

	toInput.value = calculateConversion(amount, fromValue, toValue);
}

function addButtons() {
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

		const button = document.createElement('button');
		button.classList.add('primary', 'currency-btn');
		button.textContent = 'Convertir';

		button.addEventListener('click', () => {
			const newDialog = document.createElement('section');
			newDialog.classList.add('dialog');

			const closeBtn = document.createElement('button');
			closeBtn.classList.add('close-btn');
			closeBtn.textContent = 'X';
			closeBtn.addEventListener('click', () => {
				newDialog.remove();
			});

			newDialog.appendChild(closeBtn);

			const newConversor = createConversor(currency);
			newDialog.appendChild(newConversor);

			document.body.appendChild(newDialog);
		});

		valueContainer.appendChild(button);
	});
}

const observer = new MutationObserver(addButtons);
observer.observe(document.getElementById('currencies'), { childList: true });
