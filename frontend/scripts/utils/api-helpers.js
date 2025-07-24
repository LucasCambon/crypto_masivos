import { getStoredToken } from './auth-helpers.js';

export async function apiRequest(url, options = {}) {
	const { requireAuth = false, ...fetchOptions } = options;

	const headers = {
		'Content-Type': 'application/json',
		...fetchOptions.headers,
	};

	if (requireAuth) {
		const token = getStoredToken();
		if (!token) {
			throw new Error('No authentication token found');
		}
		headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(url, {
		...fetchOptions,
		headers,
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || `HTTP ${response.status}`);
	}

	return data;
}

export function createApiResponse(
	success,
	data = null,
	error = null,
	token = null
) {
	const response = { success };
	if (data) response.data = data;
	if (error) response.error = error;
	if (token) response.token = token;
	if (data) response.user = data;
	return response;
}
