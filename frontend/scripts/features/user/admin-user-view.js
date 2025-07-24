import { fetchUsers, updateUserRole } from '../../api/user-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';

function createUserGrid() {
	const grid = createElement('div', 'users-grid');
	const headers = ['ID', 'Usuario', 'Email', 'Fecha de registro', 'Rol'];

	headers.forEach((text) => {
		const headerSpan = createElement('span', 'grid-header-title', text);
		grid.appendChild(headerSpan);
	});

	return grid;
}

function createRoleSelect(user) {
	const select = createElement('select', 'grid-row-select');
	select.name = 'role';
	select.dataset.userId = user.id;

	const roles = [user.role, user.role === 'user' ? 'admin' : 'user'];
	roles.forEach((role) => {
		const option = createElement('option', '', role);
		option.value = role;
		if (role === user.role) option.selected = true;
		select.appendChild(option);
	});

	select.addEventListener('change', async (event) => {
		const userId = event.target.dataset.userId;
		const newRole = event.target.value;
		const originalRole = user.role;

		if (newRole === originalRole) return;

		try {
			const result = await updateUserRole(userId, newRole);

			if (!result.success) {
				throw new Error(result.error);
			}

			user.role = newRole;
		} catch (error) {
			console.error('Failed to update user role:', error);
			select.value = originalRole;
		}
	});

	return select;
}

function renderUserRow(user, grid) {
	const fields = [
		user.id,
		user.username,
		user.email,
		new Date(user.created_at).toLocaleString(),
	];

	fields.forEach((value) => {
		const span = createElement('span', 'grid-row-text', value);
		grid.appendChild(span);
	});

	const roleSelect = createRoleSelect(user);
	grid.appendChild(roleSelect);
}

export async function showUsers() {
	const content = document.querySelector('.content');
	content.innerHTML = '';

	const title = createElement('h2', 'content-title', 'Lista de usuarios');
	const grid = createUserGrid();

	appendChildren(content, title, grid);

	const data = await fetchUsers();

	if (data.error) {
		const errorSpan = createElement(
			'span',
			'grid-row-text error',
			data.error
		);
		grid.appendChild(errorSpan);
		return;
	}

	if (!data || data.length === 0) {
		const errorSpan = createElement(
			'span',
			'grid-row-text error',
			'No se pudieron cargar los usuarios.'
		);
		grid.appendChild(errorSpan);
		return;
	}

	data.forEach((user) => renderUserRow(user, grid));
}
