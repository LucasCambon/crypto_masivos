import { fetchUsers, updateUserRole } from '../../api/user-api.js';

export async function showUsers() {
	const content = document.querySelector('.content');
	content.innerHTML = '';

	const title = document.createElement('h2');
	title.className = 'content-title';
	title.textContent = 'Lista de usuarios';

	const grid = document.createElement('div');
	grid.className = 'users-grid';

	const headers = ['ID', 'Usuario', 'Email', 'Fecha de registro', 'Rol'];
	headers.forEach((text) => {
		const span = document.createElement('span');
		span.className = 'grid-header-title';
		span.textContent = text;
		grid.appendChild(span);
	});

	content.appendChild(title);
	content.appendChild(grid);

	const data = await fetchUsers();

	if (data.error) {
		grid.innerHTML = `<span class="grid-row-text error">${data.error}</span>`;
		return;
	}

	if (!data || data.length === 0) {
		grid.innerHTML += `<span class="grid-row-text error">No se pudieron cargar los usuarios.</span>`;
		return;
	}

	data.forEach((user) => {
		const fields = [
			user.id,
			user.username,
			user.email,
			new Date(user.created_at).toLocaleString(),
		];

		fields.forEach((value) => {
			const span = document.createElement('span');
			span.className = 'grid-row-text';
			span.textContent = value;
			grid.appendChild(span);
		});

		const select = document.createElement('select');
		select.className = 'grid-row-select';
		select.name = 'role';
		select.dataset.userId = user.id;

		const roles = [user.role, user.role === 'user' ? 'admin' : 'user'];
		roles.forEach((role) => {
			const option = document.createElement('option');
			option.value = role;
			option.textContent = role;
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

		grid.appendChild(select);
	});
}
