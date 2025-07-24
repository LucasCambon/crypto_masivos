import { createElement, appendChildren } from './dom-helpers.js';

export function createCurrencyInfo(currency) {
	const infoContainer = createElement('div', 'currency-info');
	const symbol = createElement('span', 'currency-symbol', currency.symbol);
	const name = createElement('span', 'currency-name', currency.name);

	appendChildren(infoContainer, symbol, name);
	return infoContainer;
}

export function createCurrencyValue(currency) {
	const valueContainer = createElement('div', 'currency-value');
	const usdValue = createElement(
		'span',
		'currency-usd-value',
		`$${currency.usd_value}`
	);

	valueContainer.appendChild(usdValue);
	return valueContainer;
}

export function renderCurrencies(currencies, container, options = {}) {
	const { limit, insertPosition = 'append' } = options;

	if (!container) return;

	const currenciesToRender = limit ? currencies.slice(0, limit) : currencies;

	currenciesToRender.forEach((currency) => {
		const currencyElement = createCurrencyCard(currency);

		if (insertPosition === 'prepend') {
			container.insertBefore(currencyElement, container.firstChild);
		} else {
			container.appendChild(currencyElement);
		}
	});
}

export function createCurrencyCard(currency) {
	const card = createElement('div', 'currency');
	const info = createCurrencyInfo(currency);
	const value = createCurrencyValue(currency);

	appendChildren(card, info, value);
	return card;
}
