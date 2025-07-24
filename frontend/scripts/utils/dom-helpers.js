export function createElement(tag, className = '', textContent = '') {
	const element = document.createElement(tag);
	if (className) element.className = className;
	if (textContent) element.textContent = textContent;
	return element;
}

export function createInput(config) {
	const {
		id,
		type = 'text',
		name,
		placeholder,
		required = false,
		autocomplete,
		maxLength,
		step,
		min,
		value,
	} = config;
	const input = createElement('input');

	if (id) input.id = id;
	if (name) input.name = name;
	if (placeholder) input.placeholder = placeholder;
	if (autocomplete) input.autocomplete = autocomplete;
	if (maxLength) input.maxLength = maxLength;
	if (step) input.step = step;
	if (min) input.min = min;
	if (value !== undefined) input.value = value;

	input.type = type;
	input.required = required;

	return input;
}

export function createLabel(htmlFor, textContent) {
	const label = createElement('label', '', textContent);
	if (htmlFor) label.htmlFor = htmlFor;
	return label;
}

export function createFormField(config) {
	const { id, label, ...inputConfig } = config;
	const labelEl = createLabel(id, label);
	const inputEl = createInput({ id, ...inputConfig });
	return { label: labelEl, input: inputEl };
}

export function appendChildren(parent, ...children) {
	children.forEach((child) => parent.appendChild(child));
}

export function toggleActiveButton(activeBtn, ...buttons) {
	buttons.forEach((btn) => btn.classList.remove('active-btn'));
	activeBtn.classList.add('active-btn');
}
