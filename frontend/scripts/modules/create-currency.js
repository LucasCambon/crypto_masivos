import { createCurrency } from './api.js';

export function createCreateCurrency(onClose) {
	const newCreateCurrency = document.createElement('div');
	newCreateCurrency.classList.add('create-currency');

	const headerContainer = document.createElement('div');
	headerContainer.classList.add('dialog-header');

	const title = document.createElement('h2');
	title.classList.add('dialog-title');
	title.textContent = 'Crear Criptomoneda';

	const closeIcon = document.createElement('span');
	closeIcon.classList.add('close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	headerContainer.appendChild(title);
	headerContainer.appendChild(closeIcon);

	newCreateCurrency.appendChild(headerContainer);

	const newForm = document.createElement('form');
	newForm.id = 'create-currency-form';
	newForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const name = e.target.name.value;
		const symbol = e.target.symbol.value;
		const usd_value = parseFloat(e.target.usd_value.value);
		const liquidity = parseFloat(e.target.liquidity.value);

		try {
			const result = await createCurrency({
				name,
				symbol,
				usd_value,
				liquidity,
			});

			if (!result.success) {
				console.error('Currency creation failed:', result.error);
				errorSpan.textContent = result.error;
				return;
			}

			// Close dialog on success
			onClose(true);
		} catch (error) {
			console.error('Request failed:', error.message);
			errorSpan.textContent = 'Error inesperado durante la creación';
		}
	});
	newCreateCurrency.appendChild(newForm);

	// Nombre Input
	const nameLabel = document.createElement('label');
	nameLabel.htmlFor = 'create-currency-name';
	nameLabel.textContent = 'Nombre';
	newForm.appendChild(nameLabel);

	const nameInput = document.createElement('input');
	nameInput.id = 'create-currency-name';
	nameInput.type = 'text';
	nameInput.name = 'name';
	nameInput.required = true;
	nameInput.placeholder = 'Bitcoin';
	newForm.appendChild(nameInput);

	// Símbolo Input
	const symbolLabel = document.createElement('label');
	symbolLabel.htmlFor = 'create-currency-symbol';
	symbolLabel.textContent = 'Símbolo';
	newForm.appendChild(symbolLabel);

	const symbolInput = document.createElement('input');
	symbolInput.id = 'create-currency-symbol';
	symbolInput.type = 'text';
	symbolInput.name = 'symbol';
	symbolInput.required = true;
	symbolInput.placeholder = 'BTC';
	symbolInput.maxLength = 10;
	newForm.appendChild(symbolInput);

	// Precio (USD) Input
	const usdValueLabel = document.createElement('label');
	usdValueLabel.htmlFor = 'create-currency-usd-value';
	usdValueLabel.textContent = 'Precio (USD)';
	newForm.appendChild(usdValueLabel);

	const usdValueInput = document.createElement('input');
	usdValueInput.id = 'create-currency-usd-value';
	usdValueInput.type = 'number';
	usdValueInput.name = 'usd_value';
	usdValueInput.required = true;
	usdValueInput.step = '0.000001';
	usdValueInput.min = '0';
	usdValueInput.placeholder = '50000.00';
	newForm.appendChild(usdValueInput);

	// Liquidez Input
	const liquidityLabel = document.createElement('label');
	liquidityLabel.htmlFor = 'create-currency-liquidity';
	liquidityLabel.textContent = 'Liquidez';
	newForm.appendChild(liquidityLabel);

	const liquidityInput = document.createElement('input');
	liquidityInput.id = 'create-currency-liquidity';
	liquidityInput.type = 'number';
	liquidityInput.name = 'liquidity';
	liquidityInput.required = true;
	liquidityInput.step = '0.000001';
	liquidityInput.min = '0';
	liquidityInput.placeholder = '1000000.00';
	newForm.appendChild(liquidityInput);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Crear Criptomoneda';
	submitButton.classList.add('primary');
	newForm.appendChild(submitButton);

	const errorSpan = document.createElement('span');
	errorSpan.classList.add('error');
	newForm.appendChild(errorSpan);

	return newCreateCurrency;
}
