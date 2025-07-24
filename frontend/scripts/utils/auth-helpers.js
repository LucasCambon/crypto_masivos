export function getStoredToken() {
	return localStorage.getItem('token');
}

export function storeToken(token) {
	localStorage.setItem('token', token);
}

export function clearToken() {
	localStorage.removeItem('token');
}

export function redirectBasedOnRole(user) {
	const isAdmin = user?.role === 'admin';
	window.location.href = isAdmin ? 'dashboard.html' : 'portfolio.html';
}

export function redirectToHome() {
	window.location.href = '/index.html';
}

export function requireAuth() {
	if (!getStoredToken()) {
		redirectToHome();
		return false;
	}
	return true;
}
