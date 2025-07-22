export function createRegister(onClose) {
	const newRegister = document.createElement('div');
	newRegister.classList.add('register');

	const headerContainer = document.createElement('div');
	headerContainer.classList.add('dialog-header');

	const title = document.createElement('h2');
	title.classList.add('dialog-title');
	title.textContent = 'Registrarse';

	const closeIcon = document.createElement('span');
	closeIcon.classList.add('close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	headerContainer.appendChild(title);
	headerContainer.appendChild(closeIcon);

	newRegister.appendChild(headerContainer);

	const newForm = document.createElement('form');
	newForm.addEventListener('submit', (e) => e.preventDefault());
	newRegister.appendChild(newForm);

	const emailInput = document.createElement('input');
	emailInput.type = 'email';
	emailInput.name = 'email';
	emailInput.required = true;
	emailInput.placeholder = 'Correo electrónico';
	newForm.appendChild(emailInput);

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.name = 'password';
	passwordInput.required = true;
	passwordInput.placeholder = 'Contraseña';
	newForm.appendChild(passwordInput);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Registrarse';
	newForm.appendChild(submitButton);

	return newRegister;
}
