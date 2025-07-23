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
		try {
			const response = await fetch('/api/v1/users/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: e.target.email.value,
					password: e.target.password.value,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				console.error('Server returned an error:', data);

				if (data.errors) {
					errorSpan.textContent = data.errors[0].message;
				} else {
					errorSpan.textContent = data.message;
				}

				throw new Error(data.message || 'Error logging in');
			}

			localStorage.setItem('authToken', data.token);
			localStorage.setItem('authAdmin', data.admin);

			if (localStorage.getItem('authToken')) {
				window.location.href = 'portfolio.html';
			} else if (localStorage.getItem('authAdmin')) {
				window.location.href = 'dashboard.html';
			}
		} catch (error) {
			console.error('Request failed:', error.message);
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
