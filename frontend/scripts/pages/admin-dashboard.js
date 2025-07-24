import { showUsers } from '../features/user/admin-user-view.js';
import { showCurrencies } from '../features/currency/admin-currency-view.js';
import { logoutUser } from '../api/auth-api.js';
import { fetchUserProfile } from '../api/user-api.js';
import { showCreateCurrencyDialog } from '../components/dialog-manager.js';
import { requireAuth } from '../utils/auth-helpers.js';
import { toggleActiveButton } from '../utils/dom-helpers.js';

async function checkAdminAccess() {
	try {
		const result = await fetchUserProfile();
		return result.success && result.user?.role === 'admin';
	} catch (error) {
		console.error('Error checking admin access:', error);
		return false;
	}
}

function setupNavigation(usersBtn, currenciesBtn) {
	const switchToUsers = () => {
		toggleActiveButton(usersBtn, usersBtn, currenciesBtn);
		showUsers();
	};

	const switchToCurrencies = () => {
		toggleActiveButton(currenciesBtn, usersBtn, currenciesBtn);
		showCurrencies();
	};

	usersBtn.addEventListener('click', switchToUsers);
	currenciesBtn.addEventListener('click', switchToCurrencies);

	// Set initial state
	switchToUsers();
}

function setupCreateCurrencyHandler() {
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('create-icon')) {
			showCreateCurrencyDialog(() => showCurrencies());
		}
	});
}

async function initDashboard() {
	if (!requireAuth()) return;

	const isAdmin = await checkAdminAccess();
	if (!isAdmin) {
		window.location.href = '/portfolio.html';
		return;
	}

	document.body.style.display = 'flex';

	const usersBtn = document.getElementById('users-btn');
	const currenciesBtn = document.getElementById('currencies-btn');
	const portfolioBtn = document.querySelector('.portfolio-btn');
	const logoutBtn = document.querySelector('.logout-btn');

	setupNavigation(usersBtn, currenciesBtn);
	setupCreateCurrencyHandler();

	logoutBtn.addEventListener('click', logoutUser);
		portfolioBtn.addEventListener('click', () => {
		window.location.href = '/portfolio.html';
	});
}

document.addEventListener('DOMContentLoaded', initDashboard);
