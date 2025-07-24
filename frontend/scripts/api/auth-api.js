import { apiRequest, createApiResponse } from '../utils/api-helpers.js';
import { clearToken, redirectToHome } from '../utils/auth-helpers.js';

export async function loginUser(email, password) {
	try {
		const data = await apiRequest('/api/v1/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
		});

		return createApiResponse(true, data.data, null, data.token);
	} catch (error) {
		return createApiResponse(false, null, error.message);
	}
}

export async function registerUser(username, email, password) {
	try {
		const response = await fetch('/api/v1/users/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, email, password }),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || 'Error creating user');
		}

		const authHeader = response.headers.get('Authorization');
		const token = authHeader ? authHeader.split(' ')[1] : data.token;

		return createApiResponse(true, data.data, null, token);
	} catch (error) {
		return createApiResponse(false, null, error.message);
	}
}

export function logoutUser() {
	try {
		clearToken();
		redirectToHome();
		return { success: true, message: 'Logged out successfully' };
	} catch (error) {
		console.error('Error during logout:', error);
		return { success: false, error: error.message };
	}
}
