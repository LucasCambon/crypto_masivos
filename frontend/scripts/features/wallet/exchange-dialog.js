import { fetchWallets, updateWallet } from '../../api/wallet-api.js';
import { createElement, appendChildren } from '../../utils/dom-helpers.js';

export function createExchangeDialog(onClose) {
	const container = createElement('div', 'exchange');
	const content = createElement('div', 'dialog-content');

	const header = createElement('div', 'dialog-header');
	const title = createElement('h2', '', 'Exchange Between Wallets');
	const closeBtn = createElement('span', 'close-icon');
	closeBtn.addEventListener('click', onClose);
	appendChildren(header, title, closeBtn);

	const form = createElement('form', 'exchange-form');

	// From wallet selection
	const fromWalletGroup = createElement('div', 'form-group');
	const fromWalletLabel = createElement('label', '', 'From Wallet:');
	fromWalletLabel.setAttribute('for', 'exchange-from-wallet-select');
	const fromWalletSelect = createElement('select', 'from-wallet-select');
	fromWalletSelect.id = 'exchange-from-wallet-select';
	fromWalletSelect.name = 'fromWallet';
	fromWalletSelect.required = true;
	appendChildren(fromWalletGroup, fromWalletLabel, fromWalletSelect);

	// From wallet balance display
	const fromBalanceDisplay = createElement('div', 'balance-display');
	const fromBalanceText = createElement(
		'span',
		'balance-text',
		'Available: 0'
	);
	fromBalanceDisplay.appendChild(fromBalanceText);

	// Amount input
	const amountGroup = createElement('div', 'form-group');
	const amountLabel = createElement('label', '', 'Amount to Transfer:');
	amountLabel.setAttribute('for', 'exchange-amount-input');
	const amountInput = createElement('input', 'amount-input');
	amountInput.id = 'exchange-amount-input';
	amountInput.name = 'amount';
	amountInput.type = 'number';
	amountInput.step = '0.01';
	amountInput.min = '0';
	amountInput.required = true;
	appendChildren(amountGroup, amountLabel, amountInput);

	// To wallet selection
	const toWalletGroup = createElement('div', 'form-group');
	const toWalletLabel = createElement('label', '', 'To Wallet:');
	toWalletLabel.setAttribute('for', 'exchange-to-wallet-select');
	const toWalletSelect = createElement('select', 'to-wallet-select');
	toWalletSelect.id = 'exchange-to-wallet-select';
	toWalletSelect.name = 'toWallet';
	toWalletSelect.required = true;
	appendChildren(toWalletGroup, toWalletLabel, toWalletSelect);

	// To wallet balance display
	const toBalanceDisplay = createElement('div', 'balance-display');
	const toBalanceText = createElement('span', 'balance-text', 'Current: 0');
	toBalanceDisplay.appendChild(toBalanceText);

	// Exchange rate info and conversion display
	const exchangeInfo = createElement('div', 'exchange-info');
	const exchangeText = createElement(
		'span',
		'exchange-text',
		'Select wallets to see conversion rate'
	);
	const conversionDisplay = createElement('div', 'conversion-display');
	const conversionText = createElement('span', 'conversion-text', '');
	conversionDisplay.appendChild(conversionText);
	appendChildren(exchangeInfo, exchangeText, conversionDisplay);

	// Buttons
	const buttonGroup = createElement('div', 'dialog-buttons');
	const cancelBtn = createElement('button', 'cancel-btn', 'Cancel');
	cancelBtn.type = 'button';
	cancelBtn.addEventListener('click', onClose);

	const exchangeBtn = createElement('button', 'primary', 'Transfer');
	exchangeBtn.type = 'submit';

	const error = createElement('span', 'error');

	appendChildren(buttonGroup, cancelBtn, exchangeBtn);
	appendChildren(
		form,
		fromWalletGroup,
		fromBalanceDisplay,
		amountGroup,
		toWalletGroup,
		toBalanceDisplay,
		exchangeInfo,
		buttonGroup,
		error
	);
	appendChildren(content, header, form);
	container.appendChild(content);

	let wallets = [];

	loadWallets();

	async function loadWallets() {
		try {
			wallets = await fetchWallets();
			updateWalletSelects();
		} catch (error) {
			console.error('Failed to load wallets:', error);
		}
	}

	function updateWalletSelects() {
		// Clear both selects
		fromWalletSelect.innerHTML =
			'<option value="">Select source wallet...</option>';
		toWalletSelect.innerHTML =
			'<option value="">Select destination wallet...</option>';

		wallets.forEach((wallet) => {
			const fromOption = createElement('option', '');
			fromOption.value = wallet.id;
			fromOption.textContent = `${wallet.currency_symbol} - ${wallet.currency_name} (${wallet.balance})`;
			fromOption.dataset.balance = wallet.balance;
			fromOption.dataset.currencyId = wallet.currency_id;
			fromOption.dataset.usdValue = wallet.currency_usd_value || 0;
			fromWalletSelect.appendChild(fromOption);

			const toOption = createElement('option', '');
			toOption.value = wallet.id;
			toOption.textContent = `${wallet.currency_symbol} - ${wallet.currency_name} (${wallet.balance})`;
			toOption.dataset.balance = wallet.balance;
			toOption.dataset.currencyId = wallet.currency_id;
			toOption.dataset.usdValue = wallet.currency_usd_value || 0;
			toWalletSelect.appendChild(toOption);
		});
	}

	// Update balance displays and filter options
	fromWalletSelect.addEventListener('change', () => {
		const selectedOption = fromWalletSelect.selectedOptions[0];
		if (selectedOption && selectedOption.dataset.balance) {
			const balance = parseFloat(selectedOption.dataset.balance);
			fromBalanceText.textContent = `Available: ${balance}`;
			amountInput.max = balance;

			// Filter out the selected wallet from "to" options
			updateToWalletOptions();
			updateConversionDisplay();
		} else {
			fromBalanceText.textContent = 'Available: 0';
			amountInput.max = '';
			updateConversionDisplay();
		}
	});

	toWalletSelect.addEventListener('change', () => {
		const selectedOption = toWalletSelect.selectedOptions[0];
		if (selectedOption && selectedOption.dataset.balance) {
			const balance = parseFloat(selectedOption.dataset.balance);
			toBalanceText.textContent = `Current: ${balance}`;
		} else {
			toBalanceText.textContent = 'Current: 0';
		}
		updateConversionDisplay();
	});

	amountInput.addEventListener('input', updateConversionDisplay);

	function updateToWalletOptions() {
		const fromWalletId = fromWalletSelect.value;
		const currentToValue = toWalletSelect.value;

		// Clear and rebuild to wallet options
		toWalletSelect.innerHTML =
			'<option value="">Select destination wallet...</option>';

		wallets.forEach((wallet) => {
			// Don't include the selected "from" wallet
			if (wallet.id.toString() !== fromWalletId) {
				const option = createElement('option', '');
				option.value = wallet.id;
				option.textContent = `${wallet.currency_symbol} - ${wallet.currency_name} (${wallet.balance})`;
				option.dataset.balance = wallet.balance;
				option.dataset.currencyId = wallet.currency_id;

				// Restore previous selection if still valid
				if (wallet.id.toString() === currentToValue) {
					option.selected = true;
				}

				toWalletSelect.appendChild(option);
			}
		});

		// Update to balance display if there was a previous selection
		if (currentToValue && toWalletSelect.value === currentToValue) {
			const selectedOption = toWalletSelect.selectedOptions[0];
			if (selectedOption) {
				const balance = parseFloat(selectedOption.dataset.balance);
				toBalanceText.textContent = `Current: ${balance}`;
			}
		} else {
			toBalanceText.textContent = 'Current: 0';
		}
	}

	function getConversionRate(fromWallet, toWallet) {
		if (!fromWallet || !toWallet) return null;

		// If same currency, rate is 1:1
		if (fromWallet.currency_id === toWallet.currency_id) {
			return 1;
		}

		// Convert through USD: from -> USD -> to
		const fromUsdValue = fromWallet.currency_usd_value || 0;
		const toUsdValue = toWallet.currency_usd_value || 0;

		if (fromUsdValue === 0 || toUsdValue === 0) {
			return null;
		}

		return fromUsdValue / toUsdValue;
	}

	function updateConversionDisplay() {
		const fromWalletId = fromWalletSelect.value;
		const toWalletId = toWalletSelect.value;
		const amount = parseFloat(amountInput.value) || 0;

		if (!fromWalletId || !toWalletId) {
			exchangeText.textContent =
				'Select both wallets to see conversion rate';
			conversionText.textContent = '';
			return;
		}

		const fromWallet = wallets.find(
			(w) => w.id.toString() === fromWalletId
		);
		const toWallet = wallets.find((w) => w.id.toString() === toWalletId);

		if (!fromWallet || !toWallet) {
			exchangeText.textContent = 'Error loading wallet information';
			conversionText.textContent = '';
			return;
		}

		const conversionRate = getConversionRate(fromWallet, toWallet);

		if (conversionRate === null) {
			exchangeText.textContent =
				'Cannot convert: Missing exchange rate data';
			conversionText.textContent = '';
			return;
		}

		if (conversionRate === 1) {
			exchangeText.textContent = `Same currency transfer (${fromWallet.currency_symbol})`;
			if (amount > 0) {
				conversionText.textContent = `${amount} ${fromWallet.currency_symbol} → ${amount} ${toWallet.currency_symbol}`;
			} else {
				conversionText.textContent = '';
			}
		} else {
			const convertedAmount = amount * conversionRate;
			exchangeText.textContent = `Exchange rate: 1 ${
				fromWallet.currency_symbol
			} = ${conversionRate.toFixed(6)} ${toWallet.currency_symbol}`;
			if (amount > 0) {
				conversionText.textContent = `${amount} ${
					fromWallet.currency_symbol
				} → ${convertedAmount.toFixed(6)} ${toWallet.currency_symbol}`;
			} else {
				conversionText.textContent = '';
			}
		}
	}

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const fromWalletId = fromWalletSelect.value;
		const toWalletId = toWalletSelect.value;
		const amount = parseFloat(amountInput.value);

		if (!fromWalletId || !toWalletId) {
			alert('Please select both source and destination wallets');
			return;
		}

		if (fromWalletId === toWalletId) {
			alert('Source and destination wallets must be different');
			return;
		}

		if (amount <= 0) {
			alert('Amount must be greater than 0');
			return;
		}

		const fromWallet = wallets.find(
			(w) => w.id.toString() === fromWalletId
		);
		const toWallet = wallets.find((w) => w.id.toString() === toWalletId);

		if (amount > fromWallet.balance) {
			alert('Insufficient funds in source wallet');
			return;
		}

		const conversionRate = getConversionRate(fromWallet, toWallet);
		if (conversionRate === null) {
			return;
		}

		const convertedAmount = amount * conversionRate;

		try {
			exchangeBtn.disabled = true;
			exchangeBtn.textContent = 'Processing...';

			// Update both wallets with conversion
			const fromResult = await updateWallet({
				id: fromWalletId,
				balance: fromWallet.balance - amount,
			});

			if (!fromResult.success) {
				throw new Error('Failed to update source wallet');
			}

			const toResult = await updateWallet({
				id: toWalletId,
				balance: toWallet.balance + convertedAmount,
			});

			if (!toResult.success) {
				// Try to revert the first transaction
				await updateWallet({
					id: fromWalletId,
					balance: fromWallet.balance,
				});
				throw new Error('Failed to update destination wallet');
			}

			onClose();
		} catch (error) {
			console.error('Exchange error:', error);
		} finally {
			exchangeBtn.disabled = false;
			exchangeBtn.textContent = 'Transfer';
		}
	});

	return container;
}
