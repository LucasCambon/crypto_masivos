const aboutLink = document.getElementById('about-link');

aboutLink.addEventListener('click', (event) => {
	event.preventDefault();
	window.location.href = 'about.html';
});
