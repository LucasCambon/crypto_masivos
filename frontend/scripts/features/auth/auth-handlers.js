import {
	showLoginDialog,
	showRegisterDialog,
} from '../../components/dialog-manager.js';

export function addLoginRegisterEventHandlers() {
	const registerBtn = document.getElementById('register-btn');
	const loginBtn = document.getElementById('login-btn');

	if (registerBtn) {
		registerBtn.addEventListener('click', () => {
			showRegisterDialog();
		});
	}

	if (loginBtn) {
		loginBtn.addEventListener('click', () => {
			showLoginDialog();
		});
	}
}
