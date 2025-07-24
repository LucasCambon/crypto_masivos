import { fetchCurrencies } from '../../api/currency-api.js';
import {
	showDeleteCurrencyDialog,
	showEditCurrencyDialog,
} from '../../components/dialog-manager.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';

function createTitleContainer() {
	const container = createElement('div', 'title-container');
	container.style.display = 'flex';
	container.style.justifyContent = 'space-between';
	container.style.alignItems = 'center';

	const title = createElement(
		'h2',
		'content-title',
		'Lista de criptomonedas'
	);
	const createIcon = createElement('span', 'create-icon');

	appendChildren(container, title, createIcon);
	return container;
}

function createCurrencyGrid() {
	const grid = createElement('div', 'currencies-grid');
	const headers = [
		'ID',
		'Nombre',
		'Símbolo',
		'Precio (USD)',
		'Liquidez',
		'Acciones',
	];

	headers.forEach((text) => {
		const headerSpan = createElement('span', 'grid-header-title', text);
		grid.appendChild(headerSpan);
	});

	return grid;
}

function createActionButtons(currency, refreshCallback) {
	const actionsSpan = createElement('span', 'grid-row-text actions');

	const deleteIcon = createElement('span', 'delete-icon');
	deleteIcon.addEventListener('click', () => {
		showDeleteCurrencyDialog(currency, refreshCallback);
	});

	const editIcon = createElement('span', 'edit-icon');
	editIcon.title = 'Editar criptomoneda';
	editIcon.style.cursor = 'pointer';
	editIcon.addEventListener('click', () => {
		showEditCurrencyDialog(currency, refreshCallback);
	});

	appendChildren(actionsSpan, deleteIcon, editIcon);
	return actionsSpan;
}

function renderCurrencyRow(currency, grid) {
	const fields = [
		currency.id,
		currency.name,
		currency.symbol,
		currency.usd_value,
		currency.liquidity,
	];

	fields.forEach((value) => {
		const span = createElement('span', 'grid-row-text', value);
		grid.appendChild(span);
	});

	const actions = createActionButtons(currency, () => showCurrencies());
	grid.appendChild(actions);
}

export async function showCurrencies() {
	const content = document.querySelector('.content');
	content.innerHTML = '';

	const titleContainer = createTitleContainer();
	const grid = createCurrencyGrid();

	appendChildren(content, titleContainer, grid);

	const data = await fetchCurrencies();

	if (data.length === 0) {
		const errorSpan = createElement(
			'span',
			'grid-row-text error',
			'No se pudieron cargar las monedas.'
		);
		grid.appendChild(errorSpan);
		return;
	}

	data.forEach((currency) => renderCurrencyRow(currency, grid));
}
