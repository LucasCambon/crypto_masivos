import { loginUser } from '../../api/auth-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import {
	createDialogHeader,
	createFormWithFields,
} from '../../utils/form-helpers.js';
import { storeToken, redirectBasedOnRole } from '../../utils/auth-helpers.js';
import { handleApiError, clearError } from '../../utils/error-handler.js';

export function createLogin(onClose) {
	const container = createElement('div', 'login');
	const header = createDialogHeader('Login', onClose);

	const fields = [
		{
			name: 'email',
			id: 'login-email',
			label: 'Correo electrónico',
			type: 'email',
			placeholder: 'Correo electrónico',
			autocomplete: 'email',
			required: true,
		},
		{
			name: 'password',
			id: 'login-password',
			label: 'Contraseña',
			type: 'password',
			placeholder: 'Contraseña',
			autocomplete: 'current-password',
			required: true,
		},
	];

	const handleSubmit = async (e, fieldElements, errorDisplay) => {
		e.preventDefault();
		clearError(errorDisplay);

		try {
			const result = await loginUser(
				fieldElements.email.value,
				fieldElements.password.value
			);

			if (!result.success) {
				throw new Error(result.error);
			}

			storeToken(result.token);
			redirectBasedOnRole(result.user);
		} catch (error) {
			handleApiError(error, errorDisplay, 'Error durante el login');
		}
	};

	const { form } = createFormWithFields('login-form', fields, handleSubmit);
	form.querySelector('button').textContent = 'Iniciar sesión';

	appendChildren(container, header, form);
	return container;
}
