import { showUsers } from './modules/users-view.js';
import { showCurrencies } from './modules/currency-view.js';

document.addEventListener('DOMContentLoaded', () => {
	const usersBtn = document.getElementById('users-btn');
	const currenciesBtn = document.getElementById('currencies-btn');

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
});
