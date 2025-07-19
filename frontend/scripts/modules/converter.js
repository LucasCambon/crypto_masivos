export function calculateConversion(amount, fromValue, toValue) {
	if (fromValue === toValue) {
		return amount;
	}

	let fromCurrency, toCurrency;

	if (fromValue !== 'USD') {
		try {
			fromCurrency = JSON.parse(fromValue);
		} catch (e) {
			console.error('Error parsing fromValue:', e);
			return 0;
		}
	}

	if (toValue !== 'USD') {
		try {
			toCurrency = JSON.parse(toValue);
		} catch (e) {
			console.error('Error parsing toValue:', e);
			return 0;
		}
	}

	// USD to crypto
	if (fromValue === 'USD' && toValue !== 'USD') {
		return (amount / toCurrency.usd_value).toFixed(6);
	}

	// Crypto to USD
	if (fromValue !== 'USD' && toValue === 'USD') {
		return (amount * fromCurrency.usd_value).toFixed(2);
	}

	// Crypto to crypto
	if (fromValue !== 'USD' && toValue !== 'USD') {
		const usdAmount = amount * fromCurrency.usd_value;
		return (usdAmount / toCurrency.usd_value).toFixed(6);
	}

	return 0;
}

export function updateConversion(fromInput, toInput, fromSelect, toSelect) {
	const amount = parseFloat(fromInput.value) || 0;
	const fromValue = fromSelect.value;
	const toValue = toSelect.value;

	toInput.value = calculateConversion(amount, fromValue, toValue);
}
