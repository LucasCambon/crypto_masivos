import { addLoginRegisterEventHandlers } from '../features/auth/auth-handlers.js';
import { setupNavigationForUser } from '../utils/nav-setup.js';

document.addEventListener('DOMContentLoaded', () => {
	addLoginRegisterEventHandlers();
	setupNavigationForUser();
});