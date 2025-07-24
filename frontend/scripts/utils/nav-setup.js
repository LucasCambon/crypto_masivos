import { fetchUserProfile } from '../api/user-api.js';
import { logoutUser } from '../api/auth-api.js';

export async function setupNavigationForUser() {
	const container = document.querySelector('.btn-container');
	if (!container) return;

	try {
		const result = await fetchUserProfile();
		if (!result.success || !result.user) return;

		container.innerHTML = '';

		const portfolioBtn = document.createElement('button');
		portfolioBtn.textContent = 'Portfolio';
		portfolioBtn.className = 'primary';
		portfolioBtn.addEventListener('click', () => {
			window.location.href = '/portfolio.html';
		});
		container.appendChild(portfolioBtn);

		if (result.user.role === 'admin') {
			const dashboardBtn = document.createElement('button');
			dashboardBtn.textContent = 'Dashboard';
			dashboardBtn.className = 'secondary';
			dashboardBtn.addEventListener('click', () => {
				window.location.href = '/dashboard.html';
			});
			container.appendChild(dashboardBtn);
		}

		const logoutBtn = document.createElement('button');
		logoutBtn.textContent = 'Cerrar sesión';
		logoutBtn.className = 'secondary';
		logoutBtn.addEventListener('click', () => {
			logoutUser();
		});
		container.appendChild(logoutBtn);
	} catch (error) {
		console.error('Error setting up user navigation:', error);
	}
}