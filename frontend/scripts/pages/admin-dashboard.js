import { showUsers } from '../features/user/admin-user-view.js';
import { showCurrencies } from '../features/currency/admin-currency-view.js';
import { logoutUser } from '../api/auth-api.js';
import { fetchUserProfile } from '../api/user-api.js';
import { showCreateCurrencyDialog } from '../components/dialog-manager.js';

async function checkAdminAccess() {
	try {
		const profileResult = await fetchUserProfile();

		if (!profileResult.success) {
			console.error('Failed to fetch user profile:', profileResult.error);
			return false;
		}

		return profileResult.user && profileResult.user.role === 'admin';
	} catch (error) {
		console.error('Error checking admin access:', error);
		return false;
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	const usersBtn = document.getElementById('users-btn');
	const currenciesBtn = document.getElementById('currencies-btn');
	const logoutBtn = document.querySelector('.logout-btn');

	const token = localStorage.getItem('token');

	if (!token) {
		window.location.href = '/index.html';
		return;
	}

	const isAdmin = await checkAdminAccess();

	if (!isAdmin) {
		window.location.href = '/portfolio.html';
		return;
	}

	const body = document.querySelector('body');
	body.style.display = 'flex';

	usersBtn.classList.add('active-btn');
	currenciesBtn.classList.remove('active-btn');
	showUsers();

	usersBtn.addEventListener('click', () => {
		usersBtn.classList.add('active-btn');
		currenciesBtn.classList.remove('active-btn');
		showUsers();
	});

	currenciesBtn.addEventListener('click', () => {
		currenciesBtn.classList.add('active-btn');
		usersBtn.classList.remove('active-btn');
		showCurrencies();
	});

	// Add event listener for create-icon (will be available after showCurrencies is called)
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('create-icon')) {
			showCreateCurrencyDialog(() => {
				// Refresh currencies list after successful creation
				showCurrencies();
			});
		}
	});

	logoutBtn.addEventListener('click', logoutUser);
});
