import { loginUser } from '../../api/auth-api.js';

export function createLogin(onClose) {
	const newLogin = document.createElement('div');
	newLogin.classList.add('login');

	const headerContainer = document.createElement('div');
	headerContainer.classList.add('dialog-header');

	const title = document.createElement('h2');
	title.classList.add('dialog-title');
	title.textContent = 'Login';

	const closeIcon = document.createElement('span');
	closeIcon.classList.add('close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') {
			onClose();
		}
	});

	headerContainer.appendChild(title);
	headerContainer.appendChild(closeIcon);

	newLogin.appendChild(headerContainer);

	const newForm = document.createElement('form');
	newForm.id = 'login-form';
	newForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const result = await loginUser(email, password);

			if (!result.success) {
				console.error('Login failed:', result.error);
				errorSpan.textContent = result.error;
				return;
			}

			// Store the token from the response
			localStorage.setItem('token', result.token);

			// Check user role and redirect accordingly
			const isAdmin = result.user && result.user.role === 'admin';

			if (isAdmin) {
				window.location.href = 'dashboard.html';
			} else {
				window.location.href = 'portfolio.html';
			}
		} catch (error) {
			console.error('Request failed:', error.message);
			errorSpan.textContent = 'Error inesperado durante el login';
		}
	});
	newLogin.appendChild(newForm);

	// Email Input
	const emailLabel = document.createElement('label');
	emailLabel.htmlFor = 'login-email';
	emailLabel.textContent = 'Correo electrónico';
	newForm.appendChild(emailLabel);

	const emailInput = document.createElement('input');
	emailInput.id = 'login-email';
	emailInput.type = 'email';
	emailInput.name = 'email';
	emailInput.required = true;
	emailInput.placeholder = 'Correo electrónico';
	emailInput.autocomplete = 'email';
	newForm.appendChild(emailInput);

	// Password Input
	const passwordLabel = document.createElement('label');
	passwordLabel.htmlFor = 'login-password';
	passwordLabel.textContent = 'Contraseña';
	newForm.appendChild(passwordLabel);

	const passwordInput = document.createElement('input');
	passwordInput.id = 'login-password';
	passwordInput.type = 'password';
	passwordInput.name = 'password';
	passwordInput.required = true;
	passwordInput.placeholder = 'Contraseña';
	passwordInput.autocomplete = 'current-password';
	newForm.appendChild(passwordInput);

	const submitButton = document.createElement('button');
	submitButton.classList.add('primary');
	submitButton.type = 'submit';
	submitButton.textContent = 'Iniciar sesión';
	newForm.appendChild(submitButton);

	const errorSpan = document.createElement('span');
	errorSpan.classList.add('error');
	newForm.appendChild(errorSpan);

	return newLogin;
}
