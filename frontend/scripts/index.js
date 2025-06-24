fetch('scripts/example-data/currencies.json')
	.then((response) => response.json())
	.then((data) => {
		const currencyList = document.querySelector('.currencies');

		data.forEach((currency) => {
			const newCurrency = document.createElement('div');
			newCurrency.classList.add('currency');

			// FIXME: create elements
			newCurrency.innerHTML = `
				<div>
					<span class="currency-symbol">${currency.symbol}</span>
					<span class="currency-name">${currency.name}</span>
				</div>
				<span class="currency-usd-value">${currency.usd_value}</span>
			`;

			currencyList.insertBefore(newCurrency, currencyList.firstChild);
		});
	})
	.catch((error) => console.error('Failed to load data:', error));
