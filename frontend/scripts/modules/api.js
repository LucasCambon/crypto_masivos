export async function fetchCurrencies() {
	try {
		const response = await fetch('/api/v1/currencies/list');
		const result = await response.json();
		return result.data;
	} catch (error) {
		console.error('Failed to load currencies:', error);
		return [];
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
