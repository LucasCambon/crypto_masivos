import { deleteCurrency } from './api.js';

export function createDeleteCurrencyDialog(currency, onClose) {
	const newDialog = document.createElement('div');
	newDialog.classList.add('delete-currency');

	const headerContainer = document.createElement('div');
	headerContainer.classList.add('dialog-header');

	const title = document.createElement('h2');
	title.classList.add('dialog-title');
	title.textContent = 'Eliminar';

	const closeIcon = document.createElement('span');
	closeIcon.classList.add('close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	headerContainer.appendChild(title);
	headerContainer.appendChild(closeIcon);

	newDialog.appendChild(headerContainer);

	// Content container
	const contentContainer = document.createElement('div');
	contentContainer.classList.add('dialog-content');

	// Confirmation message
	const confirmationMessage = document.createElement('span');
	confirmationMessage.classList.add('confirmation-message');
	confirmationMessage.textContent = `¿Desea eliminar ${currency.name}?`;

	contentContainer.appendChild(confirmationMessage);

	// Buttons container
	const buttonsContainer = document.createElement('div');
	buttonsContainer.classList.add('dialog-buttons');

	// No button (secondary)
	const noButton = document.createElement('button');
	noButton.type = 'button';
	noButton.classList.add('secondary');
	noButton.textContent = 'No';
	noButton.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	// Yes button (primary)
	const yesButton = document.createElement('button');
	yesButton.type = 'button';
	yesButton.classList.add('primary');
	yesButton.textContent = 'Sí';
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

	buttonsContainer.appendChild(noButton);
	buttonsContainer.appendChild(yesButton);

	contentContainer.appendChild(buttonsContainer);
	newDialog.appendChild(contentContainer);

	return newDialog;
}
