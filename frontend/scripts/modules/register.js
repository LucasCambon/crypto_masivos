import { registerUser } from './api.js';

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
	newForm.id = 'register-form';
	newForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const result = await registerUser(username, email, password);

			if (!result.success) {
				console.error('Registration failed:', result.error);
				errorSpan.textContent = result.error;
				return;
			}

			if (result.token) {
				localStorage.setItem('token', result.token);
			}

			onClose();
		} catch (error) {
			console.error('Request failed:', error.message);
			errorSpan.textContent = 'Error inesperado durante el registro';
		}
	});
	newRegister.appendChild(newForm);

	// Username Input
	const usernameLabel = document.createElement('label');
	usernameLabel.htmlFor = 'register-username';
	usernameLabel.textContent = 'Nombre de usuario';
	newForm.appendChild(usernameLabel);

	const usernameInput = document.createElement('input');
	usernameInput.id = 'register-username';
	usernameInput.type = 'text';
	usernameInput.name = 'username';
	usernameInput.required = true;
	usernameInput.autocomplete = 'username';
	usernameInput.placeholder = 'Nombre de usuario';
	newForm.appendChild(usernameInput);

	// Email Input
	const emailLabel = document.createElement('label');
	emailLabel.htmlFor = 'register-email';
	emailLabel.textContent = 'Correo electrónico';
	newForm.appendChild(emailLabel);

	const emailInput = document.createElement('input');
	emailInput.id = 'register-email';
	emailInput.type = 'email';
	emailInput.name = 'email';
	emailInput.required = true;
	emailInput.autocomplete = 'email';
	emailInput.placeholder = 'Correo electrónico';
	newForm.appendChild(emailInput);

	// Password Input
	const passwordLabel = document.createElement('label');
	passwordLabel.htmlFor = 'register-password';
	passwordLabel.textContent = 'Contraseña';
	newForm.appendChild(passwordLabel);

	const passwordInput = document.createElement('input');
	passwordInput.id = 'register-password';
	passwordInput.type = 'password';
	passwordInput.name = 'password';
	passwordInput.required = true;
	passwordInput.autocomplete = 'new-password';
	passwordInput.placeholder = 'Contraseña';
	newForm.appendChild(passwordInput);

	const submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Registrarse';
	submitButton.classList.add('primary');
	newForm.appendChild(submitButton);

	const errorSpan = document.createElement('span');
	errorSpan.classList.add('error');
	newForm.appendChild(errorSpan);

	return newRegister;
}
