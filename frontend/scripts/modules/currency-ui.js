export function createCurrency(currency) {
	const newCurrency = document.createElement('div');
	newCurrency.classList.add('currency');

	const infoContainer = document.createElement('div');
	infoContainer.classList.add('currency-info');

	const currencySymbol = document.createElement('span');
	currencySymbol.classList.add('currency-symbol');
	currencySymbol.innerHTML = currency.symbol;

	const currencyName = document.createElement('span');
	currencyName.classList.add('currency-name');
	currencyName.innerHTML = currency.name;

	infoContainer.appendChild(currencySymbol);
	infoContainer.appendChild(currencyName);

	const valueContainer = document.createElement('div');
	valueContainer.classList.add('currency-value');

	const currencyUSDValue = document.createElement('span');
	currencyUSDValue.classList.add('currency-usd-value');
	currencyUSDValue.innerHTML = '$' + currency.usd_value;

	valueContainer.appendChild(currencyUSDValue);

	newCurrency.appendChild(infoContainer);
	newCurrency.appendChild(valueContainer);

	return newCurrency;
}
