import { updateUser } from '../../api/user-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import {
	createDialogHeader,
	createFormWithFields,
} from '../../utils/form-helpers.js';
import { handleApiError, clearError } from '../../utils/error-handler.js';

export function createEditProfileDialog(user, onClose) {
	const container = createElement('div', 'edit-profile');
	const header = createDialogHeader('Editar Perfil', onClose);

	const fields = [
		{
			name: 'username',
			id: 'edit-profile-username',
			label: 'Nombre de usuario',
			type: 'text',
			placeholder: 'Tu nombre de usuario',
			value: user.username,
			required: true,
		},
		{
			name: 'email',
			id: 'edit-profile-email',
			label: 'Correo electrónico',
			type: 'email',
			placeholder: 'tu@email.com',
			value: user.email,
			required: true,
		},
		{
			name: 'password',
			id: 'edit-profile-password',
			label: 'Nueva contraseña (opcional)',
			type: 'password',
			placeholder: 'Dejar vacío para mantener actual',
			required: false,
		},
	];

	const handleSubmit = async (e, fieldElements, errorDisplay) => {
		e.preventDefault();
		clearError(errorDisplay);

		const updateData = {
			username: fieldElements.username.value,
			email: fieldElements.email.value,
		};

		// Only include password if it's provided
		if (fieldElements.password.value.trim()) {
			updateData.password = fieldElements.password.value;
		}

		try {
			const result = await updateUser(updateData);

			if (!result.success) {
				throw new Error(result.error);
			}

			onClose(true); // Pass true to indicate successful update
		} catch (error) {
			handleApiError(error, errorDisplay, 'Error al actualizar perfil');
		}
	};

	const { form } = createFormWithFields(
		'edit-profile-form',
		fields,
		handleSubmit
	);
	form.querySelector('button').textContent = 'Actualizar Perfil';

	appendChildren(container, header, form);
	return container;
}
