import { createCurrency } from '../../api/currency-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import {
	createDialogHeader,
	createFormWithFields,
} from '../../utils/form-helpers.js';
import { handleApiError, clearError } from '../../utils/error-handler.js';

export function createCreateCurrency(onClose) {
	const container = createElement('div', 'create-currency');
	const header = createDialogHeader('Crear Criptomoneda', onClose);

	const fields = [
		{
			name: 'name',
			id: 'create-currency-name',
			label: 'Nombre',
			placeholder: 'Bitcoin',
			required: true,
		},
		{
			name: 'symbol',
			id: 'create-currency-symbol',
			label: 'Símbolo',
			placeholder: 'BTC',
			maxLength: '10',
			required: true,
		},
		{
			name: 'usd_value',
			id: 'create-currency-usd-value',
			label: 'Precio (USD)',
			type: 'number',
			step: '0.000001',
			min: '0',
			placeholder: '50000.00',
			required: true,
		},
		{
			name: 'liquidity',
			id: 'create-currency-liquidity',
			label: 'Liquidez',
			type: 'number',
			step: '0.000001',
			min: '0',
			placeholder: '1000000.00',
			required: true,
		},
	];

	const handleSubmit = async (e, fieldElements, errorDisplay) => {
		e.preventDefault();
		clearError(errorDisplay);

		try {
			const result = await createCurrency({
				name: fieldElements.name.value,
				symbol: fieldElements.symbol.value,
				usd_value: parseFloat(fieldElements.usd_value.value),
				liquidity: parseFloat(fieldElements.liquidity.value),
			});

			if (!result.success) {
				throw new Error(result.error);
			}

			onClose(true);
		} catch (error) {
			handleApiError(error, errorDisplay, 'Error durante la creación');
		}
	};

	const { form } = createFormWithFields(
		'create-currency-form',
		fields,
		handleSubmit
	);
	form.querySelector('button').textContent = 'Crear Criptomoneda';

	appendChildren(container, header, form);
	return container;
}
