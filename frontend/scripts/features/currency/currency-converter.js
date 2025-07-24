import { updateConversion } from './conversion-utils.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';
import { createDialogHeader } from '../../utils/form-helpers.js';

let allCurrencies = [];

export function setCurrencies(currencies) {
	allCurrencies = currencies;
}

function createCurrencySelect(id, className, selectedCurrency = null) {
	const select = createElement('select', className);
	select.id = id;

	// USD option
	const usdOption = createElement('option', '', 'USD');
	usdOption.value = 'USD';
	usdOption.selected = !selectedCurrency;
	select.appendChild(usdOption);

	allCurrencies.forEach((currency) => {
		const option = createElement(
			'option',
			'',
			`${currency.symbol} (${currency.name})`
		);
		option.value = JSON.stringify(currency);

		if (selectedCurrency && currency.symbol === selectedCurrency.symbol) {
			option.selected = true;
		}

		select.appendChild(option);
	});

	return select;
}

function createCurrencyInput(config) {
	const input = createElement('input', 'currency-input');
	Object.entries(config).forEach(([key, value]) => {
		if (value !== undefined) input[key] = value;
	});
	return input;
}

function createInputGroup(type, selectedCurrency = null) {
	const container = createElement('div', 'conversor-input-group');

	const input = createCurrencyInput({
		type: 'number',
		name: type,
		min: '0',
		step: type === 'from' ? '0.01' : '0.000001',
		value: type === 'from' ? '1' : '',
		readOnly: type === 'to',
	});

	const select = createCurrencySelect(
		`currency-${type}`,
		'currency-select',
		type === 'to' ? selectedCurrency : null
	);

	appendChildren(container, input, select);
	return { container, input, select };
}

function setupConversionEvents(fromInput, toInput, fromSelect, toSelect) {
	const updateFn = () =>
		updateConversion(fromInput, toInput, fromSelect, toSelect);

	fromInput.addEventListener('input', updateFn);
	fromSelect.addEventListener('change', updateFn);
	toSelect.addEventListener('change', updateFn);

	// Initial conversion
	updateFn();
}

function createSwapIcon(fromSelect, toSelect, fromInput, toInput) {
	const swapIcon = createElement('span', 'swap-icon');

	swapIcon.addEventListener('click', () => {
		const tempValue = fromSelect.value;
		fromSelect.value = toSelect.value;
		toSelect.value = tempValue;

		updateConversion(fromInput, toInput, fromSelect, toSelect);
	});

	return swapIcon;
}

export function createConversor(selectedCurrency, onClose) {
	const container = createElement('div', 'conversor');
	const header = createDialogHeader('Conversor', onClose);

	const form = createElement('form');
	form.addEventListener('submit', (e) => e.preventDefault());

	const fromGroup = createInputGroup('from');
	const toGroup = createInputGroup('to', selectedCurrency);
	const swapIcon = createSwapIcon(
		fromGroup.select,
		toGroup.select,
		fromGroup.input,
		toGroup.input
	);

	setupConversionEvents(
		fromGroup.input,
		toGroup.input,
		fromGroup.select,
		toGroup.select
	);

	appendChildren(form, fromGroup.container, swapIcon, toGroup.container);
	appendChildren(container, header, form);

	return container;
}
