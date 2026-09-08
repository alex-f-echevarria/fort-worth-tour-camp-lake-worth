const pages = [...document.querySelectorAll('.page')];
const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const pageNumber = document.querySelector('#page-number');
const pageStatus = document.querySelector('.page-status');
const restartButton = document.querySelector('.restart-button');

let currentPage = 0;
let touchStartX = 0;

function showPage(nextPage) {
	currentPage = Math.max(0, Math.min(nextPage, pages.length - 1));

	pages.forEach((page, index) => {
		page.classList.toggle('is-active', index === currentPage);
		page.setAttribute('aria-hidden', index === currentPage ? 'false' : 'true');
	});

	const formattedPage = String(currentPage + 1).padStart(2, '0');
	pageNumber.textContent = formattedPage;
	pageStatus.setAttribute('aria-label', `Page ${currentPage + 1} of ${pages.length}`);
	previousButton.disabled = currentPage === 0;
	nextButton.disabled = currentPage === pages.length - 1;
}

previousButton.addEventListener('click', () => showPage(currentPage - 1));
nextButton.addEventListener('click', () => showPage(currentPage + 1));
restartButton.addEventListener('click', () => showPage(0));

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowLeft') showPage(currentPage - 1);
	if (event.key === 'ArrowRight') showPage(currentPage + 1);
});

document.querySelector('.book').addEventListener('touchstart', (event) => {
	touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

document.querySelector('.book').addEventListener('touchend', (event) => {
	const touchEndX = event.changedTouches[0].screenX;
	const swipeDistance = touchEndX - touchStartX;

	if (Math.abs(swipeDistance) > 50) {
		showPage(currentPage + (swipeDistance < 0 ? 1 : -1));
	}
}, { passive: true });

showPage(0);
