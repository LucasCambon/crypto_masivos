/**
 * User management API functions
 */

export async function fetchUsers() {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/users/list', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to load users');
		}

		const result = await response.json();
		return result.data.sort((a, b) => a.id - b.id);
	} catch (error) {
		console.error('Failed to load users:', error);
		return { error: error.message };
	}
}

export async function updateUserRole(userId, role) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/users/update/admin', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				id: userId,
				role: role,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to update user role');
		}

		const data = await response.json();
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
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/users/profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || 'Failed to fetch user profile'
			);
		}

		const result = await response.json();
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
