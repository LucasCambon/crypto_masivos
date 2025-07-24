import { createConversor } from '../features/currency/currency-converter.js';
import { createLogin } from '../features/auth/login-form.js';
import { createRegister } from '../features/auth/register-form.js';
import { createDeleteCurrencyDialog } from '../features/currency/delete-currency-dialog.js';
import { createCreateCurrency } from '../features/currency/create-currency-form.js';
import { createEditCurrency } from '../features/currency/edit-currency-form.js';
import { createElement } from '../utils/dom-helpers.js';

function createDialog(content) {
	const dialog = createElement('section', 'dialog');
	dialog.appendChild(content);
	document.body.appendChild(dialog);
	return dialog;
}

function createDialogWithCleanup(contentCreator, ...args) {
	const dialog = createDialog(contentCreator(...args, () => dialog.remove()));
}

export function showConverterDialog(currency) {
	createDialogWithCleanup(createConversor, currency);
}

export function showLoginDialog() {
	createDialogWithCleanup(createLogin);
}

export function showRegisterDialog() {
	createDialogWithCleanup(createRegister);
}

export function showCreateCurrencyDialog(onSuccess) {
	const dialog = createDialog(
		createCreateCurrency((wasCreated) => {
			dialog.remove();
			if (wasCreated && typeof onSuccess === 'function') {
				onSuccess();
			}
		})
	);
}

export function showEditCurrencyDialog(currency, onSuccess) {
	const dialog = createDialog(
		createEditCurrency(currency, (wasUpdated) => {
			dialog.remove();
			if (wasUpdated && typeof onSuccess === 'function') {
				onSuccess(currency);
			}
		})
	);
}

export function showDeleteCurrencyDialog(currency, onSuccess) {
	const dialog = createDialog(
		createDeleteCurrencyDialog(currency, () => {
			dialog.remove();
			if (typeof onSuccess === 'function') {
				onSuccess(currency);
			}
		})
	);
}
