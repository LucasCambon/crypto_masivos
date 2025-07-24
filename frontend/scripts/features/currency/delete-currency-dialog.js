import { deleteCurrency } from '../../api/currency-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import { createDialogHeader } from '../../utils/form-helpers.js';

export function createDeleteCurrencyDialog(currency, onClose) {
	const container = createElement('div', 'delete-currency');
	const header = createDialogHeader('Eliminar', onClose);

	const content = createElement('div', 'dialog-content');
	const message = createElement(
		'span',
		'confirmation-message',
		`¿Desea eliminar ${currency.name}?`
	);

	const buttonsContainer = createElement('div', 'dialog-buttons');

	const noButton = createElement('button', 'secondary', 'No');
	noButton.type = 'button';
	noButton.addEventListener('click', () => {
		if (typeof onClose === 'function') onClose();
	});

	const yesButton = createElement('button', 'primary', 'Sí');
	yesButton.type = 'button';
	yesButton.addEventListener('click', async () => {
		try {
			const result = await deleteCurrency(currency.id);

			if (!result.success) {
				throw new Error(result.error);
			}

			if (typeof onClose === 'function') {
				onClose(true);
			}
		} catch (error) {
			console.error('Failed to delete currency:', error);
		}
	});

	appendChildren(buttonsContainer, noButton, yesButton);
	appendChildren(content, message, buttonsContainer);
	appendChildren(container, header, content);

	return container;
}
