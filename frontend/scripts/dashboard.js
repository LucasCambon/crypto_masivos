import { showUsers } from './modules/users-view.js';
import { showCurrencies } from './modules/currency-view.js';
import { logoutUser } from './modules/api.js';

document.addEventListener('DOMContentLoaded', () => {
	const usersBtn = document.getElementById('users-btn');
	const currenciesBtn = document.getElementById('currencies-btn');
	const logoutBtn = document.querySelector('.logout-btn');

	const token = localStorage.getItem('token');

	if (!token) {
		window.location.href = '/index.html';
		return;
	}

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

	logoutBtn.addEventListener('click', logoutUser);
});
