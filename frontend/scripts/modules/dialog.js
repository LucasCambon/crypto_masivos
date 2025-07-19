import { createConversor } from './conversor.js';

export function showConverterDialog(currency) {
	const newDialog = document.createElement('section');
	newDialog.classList.add('dialog');

	const closeBtn = document.createElement('button');
	closeBtn.classList.add('close-btn');
	closeBtn.textContent = 'X';
	closeBtn.addEventListener('click', () => {
		newDialog.remove();
	});

	newDialog.appendChild(closeBtn);

	const newConversor = createConversor(currency);
	newDialog.appendChild(newConversor);

	document.body.appendChild(newDialog);
}
