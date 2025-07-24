import {
	createElement,
	createFormField,
	appendChildren,
} from './dom-helpers.js';
import { createErrorDisplay } from './error-handler.js';

export function createDialogHeader(title, onClose) {
	const headerContainer = createElement('div', 'dialog-header');
	const titleEl = createElement('h2', 'dialog-title', title);
	const closeIcon = createElement('span', 'close-icon');

	closeIcon.addEventListener('click', () => {
		if (typeof onClose === 'function') onClose();
	});

	appendChildren(headerContainer, titleEl, closeIcon);
	return headerContainer;
}

export function createFormWithFields(formId, fields, onSubmit) {
	const form = createElement('form');
	form.id = formId;

	const fieldElements = {};
	const formElements = [];

	fields.forEach((fieldConfig) => {
		const { label, input } = createFormField(fieldConfig);
		fieldElements[fieldConfig.name] = input;

		// Set value if provided
		if (fieldConfig.value !== undefined) {
			input.value = fieldConfig.value;
		}

		formElements.push(label, input);
	});

	const submitButton = createElement('button', 'primary');
	submitButton.type = 'submit';
	submitButton.textContent = fields.submitText || 'Enviar';

	const errorDisplay = createErrorDisplay();

	appendChildren(form, ...formElements, submitButton, errorDisplay);

	if (onSubmit) {
		form.addEventListener('submit', (e) =>
			onSubmit(e, fieldElements, errorDisplay)
		);
	}

	return { form, fields: fieldElements, errorDisplay };
}
