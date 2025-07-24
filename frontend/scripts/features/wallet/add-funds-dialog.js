import {
	fetchWallets,
	createWallet,
	updateWallet,
} from '../../api/wallet-api.js';
import { fetchCurrencies } from '../../api/currency-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';

export function createAddFundsDialog(onClose) {
	const container = createElement('div', 'add-founds');
	const content = createElement('div', 'dialog-content');

	const header = createElement('div', 'dialog-header');
	const title = createElement('h2', '', 'Add Funds');
	const closeBtn = createElement('span', 'close-icon');
	closeBtn.addEventListener('click', onClose);
	appendChildren(header, title, closeBtn);

	const form = createElement('form', 'add-funds-form');

	// Action selection (existing wallet or create new)
	const actionGroup = createElement('div', 'form-group');
	const actionLabel = createElement('label', '', 'Action:');
	actionLabel.setAttribute('for', 'add-funds-action-select');
	const actionSelect = createElement('select', 'action-select');
	actionSelect.id = 'add-funds-action-select';
	actionSelect.name = 'action';
	actionSelect.innerHTML = `
		<option value="">Select action...</option>
		<option value="existing">Add to existing wallet</option>
		<option value="create">Create new wallet</option>
	`;
	appendChildren(actionGroup, actionLabel, actionSelect);

	// Existing wallet selection (hidden initially)
	const existingWalletGroup = createElement(
		'div',
		'form-group existing-wallet-group'
	);
	existingWalletGroup.style.display = 'none';
	const walletLabel = createElement('label', '', 'Select Wallet:');
	walletLabel.setAttribute('for', 'add-funds-wallet-select');
	const walletSelect = createElement('select', 'wallet-select');
	walletSelect.id = 'add-funds-wallet-select';
	walletSelect.name = 'wallet';
	appendChildren(existingWalletGroup, walletLabel, walletSelect);

	// New wallet creation (hidden initially)
	const newWalletGroup = createElement('div', 'form-group new-wallet-group');
	newWalletGroup.style.display = 'none';

	const currencyLabel = createElement('label', '', 'Select Currency:');
	currencyLabel.setAttribute('for', 'add-funds-currency-select');
	const currencySelect = createElement('select', 'currency-select');
	currencySelect.id = 'add-funds-currency-select';
	currencySelect.name = 'currency';

	const aliasLabel = createElement('label', '', 'Wallet Alias:');
	aliasLabel.setAttribute('for', 'add-funds-alias-input');
	const aliasInput = createElement('input', 'alias-input');
	aliasInput.id = 'add-funds-alias-input';
	aliasInput.name = 'alias';
	aliasInput.type = 'text';
	aliasInput.placeholder = 'Enter wallet alias';

	appendChildren(
		newWalletGroup,
		currencyLabel,
		currencySelect,
		aliasLabel,
		aliasInput
	);

	// Amount input
	const amountGroup = createElement('div', 'form-group');
	const amountLabel = createElement('label', '', 'Amount to Add:');
	amountLabel.setAttribute('for', 'add-funds-amount-input');
	const amountInput = createElement('input', 'amount-input');
	amountInput.id = 'add-funds-amount-input';
	amountInput.name = 'amount';
	amountInput.type = 'number';
	amountInput.step = '0.01';
	amountInput.min = '0';
	amountInput.required = true;
	appendChildren(amountGroup, amountLabel, amountInput);

	// Buttons
	const buttonGroup = createElement('div', 'dialog-buttons');
	const cancelBtn = createElement('button', 'cancel-btn', 'Cancel');
	cancelBtn.type = 'button';
	cancelBtn.addEventListener('click', onClose);

	const addBtn = createElement('button', 'submit-btn', 'Add Funds');
	addBtn.type = 'submit';

	appendChildren(buttonGroup, cancelBtn, addBtn);
	appendChildren(
		form,
		actionGroup,
		existingWalletGroup,
		newWalletGroup,
		amountGroup,
		buttonGroup
	);
	appendChildren(content, header, form);
	container.appendChild(content);

	loadWallets();
	loadCurrencies();

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

	async function loadCurrencies() {
		try {
			const currencies = await fetchCurrencies();
			currencySelect.innerHTML =
				'<option value="">Select a currency...</option>';

			currencies.forEach((currency) => {
				const option = createElement('option', '');
				option.value = currency.id;
				option.textContent = `${currency.symbol} - ${currency.name}`;
				currencySelect.appendChild(option);
			});
		} catch (error) {
			console.error('Failed to load currencies:', error);
		}
	}

	// Handle action selection
	actionSelect.addEventListener('change', () => {
		const action = actionSelect.value;

		if (action === 'existing') {
			existingWalletGroup.style.display = 'block';
			newWalletGroup.style.display = 'none';
			walletSelect.required = true;
			currencySelect.required = false;
			aliasInput.required = false;
		} else if (action === 'create') {
			existingWalletGroup.style.display = 'none';
			newWalletGroup.style.display = 'block';
			walletSelect.required = false;
			currencySelect.required = true;
			aliasInput.required = true;
		} else {
			existingWalletGroup.style.display = 'none';
			newWalletGroup.style.display = 'none';
			walletSelect.required = false;
			currencySelect.required = false;
			aliasInput.required = false;
		}
	});

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const action = actionSelect.value;
		const amount = parseFloat(amountInput.value);

		if (!action) {
			return;
		}

		if (amount <= 0) {
			return;
		}

		try {
			addBtn.disabled = true;
			addBtn.textContent = 'Processing...';

			if (action === 'existing') {
				// Add to existing wallet
				const walletId = walletSelect.value;
				const selectedOption = walletSelect.selectedOptions[0];
				const currentBalance = parseFloat(
					selectedOption.dataset.balance
				);
				const newBalance = currentBalance + amount;

				const result = await updateWallet({
					id: walletId,
					balance: newBalance,
				});

				if (result.success) {
					onClose();
				}
			} else if (action === 'create') {
				// Create new wallet with funds
				const currencyId = parseInt(currencySelect.value);
				const alias = aliasInput.value.trim();

				// First create the wallet
				const createResult = await createWallet({
					user_id: 1, // This will be validated by backend auth middleware
					address: `wallet_${Date.now()}_${Math.random()
						.toString(36)
						.substr(2, 9)}`, // Generate unique address
					alias: alias,
					currency_id: currencyId,
				});

				if (createResult.success) {
					// Then update the balance if amount > 0
					if (amount > 0) {
						const updateResult = await updateWallet({
							id: createResult.wallet.id,
							balance: amount,
						});

						if (updateResult.success) {
							alert(
								`Successfully created wallet with ${amount} funds`
							);
						}
					}
					onClose();
				}
			}
		} catch (error) {
			console.error('Add funds error:', error);
		} finally {
			addBtn.disabled = false;
			addBtn.textContent = 'Add Funds';
		}
	});

	return container;
}
