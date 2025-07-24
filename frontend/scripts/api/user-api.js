import { apiRequest } from '../utils/api-helpers.js';

export async function fetchUsers() {
	try {
		const result = await apiRequest('/api/v1/users/list', {
			requireAuth: true,
		});
		return result.data.sort((a, b) => a.id - b.id);
	} catch (error) {
		console.error('Failed to load users:', error);
		return { error: error.message };
	}
}

export async function updateUserRole(userId, role) {
	try {
		const data = await apiRequest('/api/v1/users/update/admin', {
			method: 'PUT',
			requireAuth: true,
			body: JSON.stringify({ id: userId, role }),
		});

		return {
			success: true,
			data,
			user: data.data,
		};
	} catch (error) {
		console.error('Failed to update user role:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function fetchUserProfile() {
	try {
		const result = await apiRequest('/api/v1/users/profile', {
			requireAuth: true,
		});

		return {
			success: true,
			data: result.data,
			user: result.data,
		};
	} catch (error) {
		console.error('Failed to fetch user profile:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function updateUser(userData) {
	try {
		const data = await apiRequest('/api/v1/users/update', {
			method: 'PUT',
			requireAuth: true,
			body: JSON.stringify(userData),
		});

		return {
			success: true,
			data,
			user: data.data,
		};
	} catch (error) {
		console.error('Failed to update user:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}
