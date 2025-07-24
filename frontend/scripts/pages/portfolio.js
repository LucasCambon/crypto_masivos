import { fetchWallets } from '../api/wallet-api.js';
import { logoutUser } from '../api/auth-api.js';
import { fetchUserProfile } from '../api/user-api.js';
import { requireAuth } from '../utils/auth-helpers.js';
import { createElement, appendChildren } from '../utils/dom-helpers.js';
import {
	showEditProfileDialog,
	showWithdrawDialog,
	showAddFundsDialog,
	showExchangeDialog,
} from '../components/dialog-manager.js';

let currentUser = null;

async function loadUserProfile() {
	try {
		const result = await fetchUserProfile();
		if (result.success) {
			currentUser = result.user;
			updateUserGreeting();
		}
	} catch (error) {
		console.error('Failed to load user profile:', error);
	}
}

function updateUserGreeting() {
	const greetingElement = document.getElementById('username');
	if (greetingElement && currentUser) {
		greetingElement.textContent = currentUser.username;
	}
}

function createWalletItem(wallet) {
	const walletItem = createElement('div', 'wallet-item');

	const walletInfo = createElement('div', 'wallet-info');

	const walletDetails = createElement('div', 'wallet-details');
	const walletSymbol = createElement(
		'span',
		'wallet-symbol',
		wallet.currency_symbol || 'UNKNOWN'
	);
	const walletName = createElement(
		'span',
		'wallet-name',
		wallet.currency_name || wallet.alias || 'Unknown Currency'
	);

	appendChildren(walletDetails, walletSymbol, walletName);
	appendChildren(walletInfo, walletDetails);

	const walletBalance = createElement(
		'span',
		'wallet-balance',
		`${wallet.balance || 0}`
	);

	appendChildren(walletItem, walletInfo, walletBalance);
	return walletItem;
}

async function renderWalletList(wallets) {
	const walletList = document.querySelector('.wallet-list');
	if (!walletList) return;

	walletList.innerHTML = '';

	if (!wallets || wallets.length === 0) {
		const emptyMessage = createElement(
			'p',
			'empty-message',
			'No tienes billeteras aún'
		);
		walletList.appendChild(emptyMessage);
		return;
	}

	wallets.forEach((wallet) => {
		const walletItem = createWalletItem(wallet);
		walletList.appendChild(walletItem);
	});
}

function calculateTotal(wallets) {
	if (!wallets) return 0;

	return wallets.reduce((total, wallet) => {
		const usdValue = wallet.currency_usd_value || 0;
		return total + wallet.balance * usdValue;
	}, 0);
}

function renderTotal(wallets) {
	const totalElement = document.querySelector('.total p:last-child');
	if (!totalElement) return;

	const total = calculateTotal(wallets);
	totalElement.textContent = `$${total.toFixed(2)}`;
}

async function loadPortfolioData() {
	try {
		const wallets = await fetchWallets();

		if (wallets) {
			renderWalletList(wallets);
			renderTotal(wallets);
		}
	} catch (error) {
		console.error('Failed to load portfolio data:', error);
	}
}

function setupEventListeners() {
	const logoutBtn = document.getElementById('logout-btn');
	if (logoutBtn) {
		logoutBtn.addEventListener('click', logoutUser);
	}

	const editProfileBtn = document.querySelector('.edit-profile-btn');
	if (editProfileBtn) {
		editProfileBtn.addEventListener('click', () => {
			showEditProfileDialog(currentUser, () => {
				loadUserProfile(); // Refresh user data after edit
			});
		});
	}

	// Wallet action buttons
	const exchangeButton = document.querySelector('.exchange-icon');
	if (exchangeButton) {
		exchangeButton.addEventListener('click', () => {
			showExchangeDialog(() => {
				loadPortfolioData();
			});
		});
	}

	const withdrawButton = document.querySelector('.withdraw-icon');
	if (withdrawButton) {
		withdrawButton.addEventListener('click', () => {
			showWithdrawDialog(() => {
				loadPortfolioData();
			});
		});
	}

	const addFundsButton = document.querySelector('.add-founds-icon');
	if (addFundsButton) {
		addFundsButton.addEventListener('click', () => {
			showAddFundsDialog(() => {
				loadPortfolioData();
			});
		});
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	if (!requireAuth()) return;

	await loadUserProfile();
	await loadPortfolioData();
	setupEventListeners();
});
