export function handleApiError(
	error,
	errorElement,
	defaultMessage = 'Error inesperado'
) {
	console.error('API Error:', error);
	if (errorElement) {
		errorElement.textContent = error.message || defaultMessage;
	}
}

export function clearError(errorElement) {
	if (errorElement) {
		errorElement.textContent = '';
	}
}

export function createErrorDisplay(className = 'error') {
	const errorSpan = document.createElement('span');
	errorSpan.className = className;
	return errorSpan;
}
