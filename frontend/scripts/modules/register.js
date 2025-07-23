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
		try {
			const response = await fetch('/api/v1/users/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: e.target.username.value,
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

				throw new Error(data.message || 'Error creating user');
			}

			const authHeader = response.headers.get('Authorization');
			const token = authHeader ? authHeader.split(' ')[1] : null;

			if (token) {
				localStorage.setItem('token', token);
			}
		} catch (error) {
			console.error('Request failed:', error.message);
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
