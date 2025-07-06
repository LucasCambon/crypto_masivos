function createCurrency(currency) {
	const newCurrency = document.createElement('div');

	const container = document.createElement('div');

	const currencySymbol = document.createElement('span');
	const currencyName = document.createElement('span');
	const currencyUSDValue = document.createElement('span');

	currencySymbol.innerHTML = currency.symbol;
	currencyName.innerHTML = currency.name;
	currencyUSDValue.innerHTML = '$' + currency.usd_value;

	newCurrency.classList.add('currency');

	currencySymbol.classList.add('currency-symbol');
	currencyName.classList.add('currency-name');
	currencyUSDValue.classList.add('currency-usd-value');

	container.appendChild(currencySymbol);
	container.appendChild(currencyName);

	newCurrency.appendChild(container);
	newCurrency.appendChild(currencyUSDValue);

	/*
		<div class="currency">
			<div>
				<span class="currency-symbol">${currency.symbol}</span>
				<span class="currency-name">${currency.name}</span>
			</div>
			<span class="currency-usd-value">${currency.usd_value}</span>
		</div>
	*/

	return newCurrency;
}

fetch('scripts/example-data/currencies.json')
	.then((response) => response.json())
	.then((data) => {
		const currencyList = document.querySelector('.currencies');

		data.forEach((currency) => {
			currencyList.insertBefore(
				createCurrency(currency),
				currencyList.firstChild
			);
		});
	})
	.catch((error) => console.error('Failed to load data:', error));
