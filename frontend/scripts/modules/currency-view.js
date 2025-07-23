import { fetchCurrencies } from './api.js';
import { showDeleteCurrencyDialog } from './dialog.js';

export async function showCurrencies() {
	const content = document.querySelector('.content');
	content.innerHTML = '';

	const titleContainer = document.createElement('div');
	titleContainer.className = 'title-container';
	titleContainer.style.display = 'flex';
	titleContainer.style.justifyContent = 'space-between';
	titleContainer.style.alignItems = 'center';
	const title = document.createElement('h2');
	title.className = 'content-title';
	title.textContent = 'Lista de criptomonedas';

	const createIcon = document.createElement('span');
	createIcon.className = 'create-icon';

	titleContainer.appendChild(title);
	titleContainer.appendChild(createIcon);

	const grid = document.createElement('div');
	grid.className = 'currencies-grid';

	const headers = [
		'ID',
		'Nombre',
		'Símbolo',
		'Precio (USD)',
		'Liquidez',
		'Acciones',
	];
	headers.forEach((text) => {
		const span = document.createElement('span');
		span.className = 'grid-header-title';
		span.textContent = text;
		grid.appendChild(span);
	});

	content.appendChild(titleContainer);
	content.appendChild(grid);

	const data = await fetchCurrencies();

	if (data.length === 0) {
		grid.innerHTML += `<span class="grid-row-text error">No se pudieron cargar las monedas.</span>`;
		return;
	}

	data.forEach((currency) => {
		const fields = [
			currency.id,
			currency.name,
			currency.symbol,
			currency.usd_value,
			currency.liquidity,
		];

		fields.forEach((value) => {
			const span = document.createElement('span');
			span.className = 'grid-row-text';
			span.textContent = value;
			grid.appendChild(span);
		});

		const actionsSpan = document.createElement('span');
		actionsSpan.className = 'grid-row-text actions';

		const deleteIcon = document.createElement('span');
		deleteIcon.className = 'delete-icon';

		deleteIcon.addEventListener('click', () => {
			showDeleteCurrencyDialog(currency, () => {
				showCurrencies();
			});
		});

		const editIcon = document.createElement('span');
		editIcon.className = 'edit-icon';

		actionsSpan.appendChild(deleteIcon);
		actionsSpan.appendChild(editIcon);
		grid.appendChild(actionsSpan);
	});
}
