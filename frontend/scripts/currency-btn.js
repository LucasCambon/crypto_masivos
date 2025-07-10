function addButtons() {
	// I select all .currency-usd-value elements to move them to the end of their container
	document.querySelectorAll('.currency-value').forEach((currencyDiv) => {
		const button = document.createElement('button');

		button.classList.add('primary', 'currency-btn');
		button.textContent = 'Convertir';

		button.addEventListener('click', () => {
			alert(`Compraste ${currencyDiv.textContent}`);
		});

		currencyDiv.appendChild(button);
	});
}

const observer = new MutationObserver(addButtons);
observer.observe(document.getElementById('currencies'), { childList: true });
