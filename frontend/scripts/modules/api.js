export async function fetchCurrencies() {
	try {
		const response = await fetch('/api/v1/currencies/list');
		const result = await response.json();
		return result.data.sort((a, b) => a.id - b.id);
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
	}
}

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

export async function loginUser(email, password) {
	try {
		const response = await fetch('/api/v1/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Error logging in');
		}

		return {
			success: true,
			data,
			token: data.token,
			user: data.data,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function registerUser(username, email, password) {
	try {
		const response = await fetch('/api/v1/users/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Error creating user');
		}

		// Get token from Authorization header or response body
		const authHeader = response.headers.get('Authorization');
		const token = authHeader ? authHeader.split(' ')[1] : data.token;

		return {
			success: true,
			data,
			token,
			user: data.data,
		};
	} catch (error) {
		return {
			success: false,
			error: error.message,
		};
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

export async function createCurrency(currencyData) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(currencyData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to create currency');
		}

		const data = await response.json();
		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to create currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function updateCurrency(currencyData) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(currencyData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to update currency');
		}

		const data = await response.json();
		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to update currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export async function deleteCurrency(currencyId) {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			throw new Error('No authentication token found');
		}

		const response = await fetch('/api/v1/currencies/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				id: currencyId,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to delete currency');
		}

		const data = await response.json();
		return {
			success: true,
			data,
			currency: data.data,
		};
	} catch (error) {
		console.error('Failed to delete currency:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}

export function logoutUser() {
	try {
		localStorage.removeItem('token');

		window.location.href = '/index.html';

		return {
			success: true,
			message: 'Logged out successfully',
		};
	} catch (error) {
		console.error('Error during logout:', error);
		return {
			success: false,
			error: error.message,
		};
	}
}
