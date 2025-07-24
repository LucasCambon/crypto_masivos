import { registerUser } from '../../api/auth-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import {
	createDialogHeader,
	createFormWithFields,
} from '../../utils/form-helpers.js';
import { storeToken } from '../../utils/auth-helpers.js';
import { handleApiError, clearError } from '../../utils/error-handler.js';

export function createRegister(onClose) {
	const container = createElement('div', 'register');
	const header = createDialogHeader('Registrarse', onClose);

	const fields = [
		{
			name: 'username',
			id: 'register-username',
			label: 'Nombre de usuario',
			type: 'text',
			placeholder: 'Nombre de usuario',
			autocomplete: 'username',
			required: true,
		},
		{
			name: 'email',
			id: 'register-email',
			label: 'Correo electrónico',
			type: 'email',
			placeholder: 'Correo electrónico',
			autocomplete: 'email',
			required: true,
		},
		{
			name: 'password',
			id: 'register-password',
			label: 'Contraseña',
			type: 'password',
			placeholder: 'Contraseña',
			autocomplete: 'new-password',
			required: true,
		},
	];

	const handleSubmit = async (e, fieldElements, errorDisplay) => {
		e.preventDefault();
		clearError(errorDisplay);

		try {
			const result = await registerUser(
				fieldElements.username.value,
				fieldElements.email.value,
				fieldElements.password.value
			);

			if (!result.success) {
				throw new Error(result.error);
			}

			if (result.token) {
				storeToken(result.token);
			}

			onClose();
		} catch (error) {
			handleApiError(error, errorDisplay, 'Error durante el registro');
		}
	};

	const { form } = createFormWithFields(
		'register-form',
		fields,
		handleSubmit
	);
	form.querySelector('button').textContent = 'Registrarse';

	appendChildren(container, header, form);
	return container;
}
