import { fetchWallets, updateWallet } from '../../api/wallet-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';

export function createWithdrawDialog(onClose) {
	const container = createElement('div', 'dialog-container');
	const content = createElement('div', 'dialog-content');

	const header = createElement('div', 'dialog-header');
	const title = createElement('h2', '', 'Withdraw Funds');
	const closeBtn = createElement('span', 'close-icon');
	closeBtn.addEventListener('click', onClose);
	appendChildren(header, title, closeBtn);

	const form = createElement('form', 'withdraw-form');

	// Wallet selection
	const walletGroup = createElement('div', 'form-group');
	const walletLabel = createElement('label', '', 'Select Wallet:');
	walletLabel.setAttribute('for', 'withdraw-wallet-select');
	const walletSelect = createElement('select', 'wallet-select');
	walletSelect.id = 'withdraw-wallet-select';
	walletSelect.name = 'wallet';
	walletSelect.required = true;
	appendChildren(walletGroup, walletLabel, walletSelect);

	// Amount input
	const amountGroup = createElement('div', 'form-group');
	const amountLabel = createElement('label', '', 'Amount to Withdraw:');
	amountLabel.setAttribute('for', 'withdraw-amount-input');
	const amountInput = createElement('input', 'amount-input');
	amountInput.id = 'withdraw-amount-input';
	amountInput.name = 'amount';
	amountInput.type = 'number';
	amountInput.step = '0.01';
	amountInput.min = '0';
	amountInput.required = true;
	appendChildren(amountGroup, amountLabel, amountInput);

	// Balance display
	const balanceDisplay = createElement('div', 'balance-display');
	const balanceText = createElement('span', 'balance-text', 'Available: 0');
	balanceDisplay.appendChild(balanceText);

	// Buttons
	const buttonGroup = createElement('div', 'dialog-buttons');
	const cancelBtn = createElement('button', 'cancel-btn', 'Cancel');
	cancelBtn.type = 'button';
	cancelBtn.addEventListener('click', onClose);

	const withdrawBtn = createElement('button', 'submit-btn', 'Withdraw');
	withdrawBtn.type = 'submit';

	const error = createElement('span', 'error');

	appendChildren(buttonGroup, cancelBtn, withdrawBtn);
	appendChildren(
		form,
		walletGroup,
		amountGroup,
		balanceDisplay,
		buttonGroup,
		error
	);
	appendChildren(content, header, form);
	container.appendChild(content);

	loadWallets();

	async function loadWallets() {
		try {
			const wallets = await fetchWallets();
			walletSelect.innerHTML =
				'<option value="">Select a wallet...</option>';

			wallets.forEach((wallet) => {
				const option = createElement('option', '');
				option.value = wallet.id;
				option.textContent = `${wallet.currency_symbol} - ${wallet.currency_name} (${wallet.balance})`;
				option.dataset.balance = wallet.balance;
				walletSelect.appendChild(option);
			});
		} catch (error) {
			console.error('Failed to load wallets:', error);
		}
	}

	walletSelect.addEventListener('change', () => {
		const selectedOption = walletSelect.selectedOptions[0];
		if (selectedOption && selectedOption.dataset.balance) {
			const balance = parseFloat(selectedOption.dataset.balance);
			balanceText.textContent = `Available: ${balance}`;
			amountInput.max = balance;
		} else {
			balanceText.textContent = 'Available: 0';
			amountInput.max = '';
		}
	});

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const walletId = walletSelect.value;
		const amount = parseFloat(amountInput.value);
		const selectedOption = walletSelect.selectedOptions[0];
		const currentBalance = parseFloat(selectedOption.dataset.balance);

		if (!walletId) {
			return;
		}

		if (amount <= 0) {
			error.textContent = 'Amount must be greater than 0';
			return;
		}

		if (amount > currentBalance) {
			error.textContent = 'Insufficient funds';
			return;
		}

		try {
			const newBalance = currentBalance - amount;

			const result = await updateWallet({
				id: parseInt(walletId),
				balance: newBalance,
			});

			if (result.success) {
				onClose();
			}
		} catch (error) {
			console.error('Withdraw error:', error);
		} finally {
			withdrawBtn.disabled = false;
			withdrawBtn.textContent = 'Withdraw';
		}
	});

	return container;
}
