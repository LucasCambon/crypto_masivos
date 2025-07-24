import { createConversor } from '../features/currency/currency-converter.js';
import { createLogin } from '../features/auth/login-form.js';
import { createRegister } from '../features/auth/register-form.js';
import { createDeleteCurrencyDialog } from '../features/currency/delete-currency-dialog.js';
import { createCreateCurrency } from '../features/currency/create-currency-form.js';
import { createEditCurrency } from '../features/currency/edit-currency-form.js';

export function showConverterDialog(currency) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newConversor = createConversor(currency, () => {
		newDialog.remove();
	});
	newDialog.appendChild(newConversor);

	document.body.appendChild(newDialog);
}

export function showLoginDialog() {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newLogin = createLogin(() => {
		newDialog.remove();
	});
	newDialog.appendChild(newLogin);

	document.body.appendChild(newDialog);
}

export function showRegisterDialog() {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newRegister = createRegister(() => {
		newDialog.remove();
	});
	newDialog.appendChild(newRegister);

	document.body.appendChild(newDialog);
}

export function showCreateCurrencyDialog(onSuccess) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newCreateCurrency = createCreateCurrency((wasCreated) => {
		newDialog.remove();

		if (wasCreated && typeof onSuccess === 'function') {
			onSuccess();
		}
	});

	newDialog.appendChild(newCreateCurrency);
	document.body.appendChild(newDialog);
}

export function showEditCurrencyDialog(currency, onSuccess) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newEditCurrency = createEditCurrency(currency, (wasUpdated) => {
		newDialog.remove();

		if (wasUpdated && typeof onSuccess === 'function') {
			onSuccess(currency);
		}
	});

	newDialog.appendChild(newEditCurrency);
	document.body.appendChild(newDialog);
}

export function showDeleteCurrencyDialog(currency, onSuccess) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newDeleteCurrency = createDeleteCurrencyDialog(currency, () => {
		newDialog.remove();

		if (typeof onSuccess === 'function') {
			onSuccess(currency);
		}
	});

	newDialog.appendChild(newDeleteCurrency);
	document.body.appendChild(newDialog);
}
