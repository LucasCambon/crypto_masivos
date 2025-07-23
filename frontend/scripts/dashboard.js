import { showUsers } from './modules/users-view.js';
import { showCurrencies } from './modules/currency-view.js';

document.addEventListener('DOMContentLoaded', () => {
	const usersBtn = document.getElementById('users-btn');
	const currenciesBtn = document.getElementById('currencies-btn');

	usersBtn.addEventListener('click', showUsers);
	currenciesBtn.addEventListener('click', showCurrencies);
});
