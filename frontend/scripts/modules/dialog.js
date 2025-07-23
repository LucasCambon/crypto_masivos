import { createConversor } from './conversor.js';
import { createLogin } from './login.js';
import { createRegister } from './register.js';

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
