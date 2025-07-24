import { updateCurrency } from '../../api/currency-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import {
	createDialogHeader,
	createFormWithFields,
} from '../../utils/form-helpers.js';
import { handleApiError, clearError } from '../../utils/error-handler.js';

export function createEditCurrency(currency, onClose) {
	const container = createElement('div', 'edit-currency');
	const header = createDialogHeader('Editar Criptomoneda', onClose);

	const fields = [
		{
			name: 'name',
			id: 'edit-currency-name',
			label: 'Nombre',
			placeholder: 'Bitcoin',
			value: currency.name,
			required: true,
		},
		{
			name: 'symbol',
			id: 'edit-currency-symbol',
			label: 'Símbolo',
			placeholder: 'BTC',
			value: currency.symbol,
			maxLength: '10',
			required: true,
		},
		{
			name: 'usd_value',
			id: 'edit-currency-usd-value',
			label: 'Precio (USD)',
			type: 'number',
			step: '0.000001',
			min: '0',
			placeholder: '50000.00',
			value: currency.usd_value,
			required: true,
		},
		{
			name: 'liquidity',
			id: 'edit-currency-liquidity',
			label: 'Liquidez',
			type: 'number',
			step: '0.000001',
			min: '0',
			placeholder: '1000000.00',
			value: currency.liquidity,
			required: true,
		},
	];

	const handleSubmit = async (e, fieldElements, errorDisplay) => {
		e.preventDefault();
		clearError(errorDisplay);

		try {
			const result = await updateCurrency({
				id: currency.id,
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
			handleApiError(
				error,
				errorDisplay,
				'Error durante la actualización'
			);
		}
	};

	const { form } = createFormWithFields(
		'edit-currency-form',
		fields,
		handleSubmit
	);
	form.querySelector('button').textContent = 'Actualizar Criptomoneda';

	appendChildren(container, header, form);
	return container;
}
