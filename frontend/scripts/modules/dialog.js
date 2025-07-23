import { createConversor } from './conversor.js';
import { createLogin } from './login.js';
import { createRegister } from './register.js';
import { createDeleteCurrencyDialog } from './delete-currency.js';
import { createCreateCurrency } from './create-currency.js';
import { createEditCurrency } from './edit-currency.js';

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
