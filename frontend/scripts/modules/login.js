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
	newForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		try {
			const response = fetch('/api/v1/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error('Error logging in');
			}

			const data = response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	});
	newLogin.appendChild(newForm);

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
	submitButton.textContent = 'Iniciar sesión';
	newForm.appendChild(submitButton);

	return newLogin;
}
