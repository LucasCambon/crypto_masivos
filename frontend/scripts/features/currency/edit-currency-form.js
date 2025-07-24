import { updateCurrency } from '../../api/currency-api.js';

export function createEditCurrency(currency, onClose) {
	const newEditCurrency = document.createElement('div');
	newEditCurrency.classList.add('edit-currency');

	const headerContainer = document.createElement('div');
	headerContainer.classList.add('dialog-header');

	const title = document.createElement('h2');
	title.classList.add('dialog-title');
	title.textContent = 'Editar Criptomoneda';

	const closeIcon = document.createElement('span');
	closeIcon.classList.add('close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	headerContainer.appendChild(title);
	headerContainer.appendChild(closeIcon);

	newEditCurrency.appendChild(headerContainer);

	const newForm = document.createElement('form');
	newForm.id = 'edit-currency-form';
	newForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const name = e.target.name.value;
		const symbol = e.target.symbol.value;
		const usd_value = parseFloat(e.target.usd_value.value);
		const liquidity = parseFloat(e.target.liquidity.value);

		try {
			const result = await updateCurrency({
				id: currency.id,
				name,
				symbol,
				usd_value,
				liquidity,
			});

			if (!result.success) {
				console.error('Currency update failed:', result.error);
				errorSpan.textContent = result.error;
				return;
			}

			// Close dialog on success
			onClose(true);
		} catch (error) {
			console.error('Request failed:', error.message);
			errorSpan.textContent = 'Error inesperado durante la actualización';
		}
	});
	newEditCurrency.appendChild(newForm);

	// Nombre Input
	const nameLabel = document.createElement('label');
	nameLabel.htmlFor = 'edit-currency-name';
	nameLabel.textContent = 'Nombre';
	newForm.appendChild(nameLabel);

	const nameInput = document.createElement('input');
	nameInput.id = 'edit-currency-name';
	nameInput.type = 'text';
	nameInput.name = 'name';
	nameInput.required = true;
	nameInput.value = currency.name;
	nameInput.placeholder = 'Bitcoin';
	newForm.appendChild(nameInput);

	// Símbolo Input
	const symbolLabel = document.createElement('label');
	symbolLabel.htmlFor = 'edit-currency-symbol';
	symbolLabel.textContent = 'Símbolo';
	newForm.appendChild(symbolLabel);

	const symbolInput = document.createElement('input');
	symbolInput.id = 'edit-currency-symbol';
	symbolInput.type = 'text';
	symbolInput.name = 'symbol';
	symbolInput.required = true;
	symbolInput.value = currency.symbol;
	symbolInput.placeholder = 'BTC';
	symbolInput.maxLength = 10;
	newForm.appendChild(symbolInput);

	// Precio (USD) Input
	const usdValueLabel = document.createElement('label');
	usdValueLabel.htmlFor = 'edit-currency-usd-value';
	usdValueLabel.textContent = 'Precio (USD)';
	newForm.appendChild(usdValueLabel);

	const usdValueInput = document.createElement('input');
	usdValueInput.id = 'edit-currency-usd-value';
	usdValueInput.type = 'number';
	usdValueInput.name = 'usd_value';
	usdValueInput.required = true;
	usdValueInput.value = currency.usd_value;
	usdValueInput.step = '0.000001';
	usdValueInput.min = '0';
	usdValueInput.placeholder = '50000.00';
	newForm.appendChild(usdValueInput);

	// Liquidez Input
	const liquidityLabel = document.createElement('label');
	liquidityLabel.htmlFor = 'edit-currency-liquidity';
	liquidityLabel.textContent = 'Liquidez';
	newForm.appendChild(liquidityLabel);

	const liquidityInput = document.createElement('input');
	liquidityInput.id = 'edit-currency-liquidity';
	liquidityInput.type = 'number';
	liquidityInput.name = 'liquidity';
	liquidityInput.required = true;
	liquidityInput.value = currency.liquidity;
	liquidityInput.step = '0.000001';
	liquidityInput.min = '0';
	liquidityInput.placeholder = '1000000.00';
	newForm.appendChild(liquidityInput);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Actualizar Criptomoneda';
	submitButton.classList.add('primary');
	newForm.appendChild(submitButton);

	const errorSpan = document.createElement('span');
	errorSpan.classList.add('error');
	newForm.appendChild(errorSpan);

	return newEditCurrency;
}
