import { createConversor } from './conversor.js';

export function showConverterDialog(currency) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const newConversor = createConversor(currency, () => {
		newDialog.remove();
	});
	newDialog.appendChild(newConversor);

	document.body.appendChild(newDialog);
}
