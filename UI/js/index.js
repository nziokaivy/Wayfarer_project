// functionality for tabs in profile page
function openTab(evt, tabName) {
	let i; let tabcontent; let
		tablinks;
	tabcontent = document.getElementsByClassName('tabcontent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}
	document.getElementById(tabName).style.display = 'block';
	evt.currentTarget.className += ' active';
}
// functionality for responsive navbar
function navBar() {
	const x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}
// functionality for sticky navbar
window.onscroll = function () {
	stickyNav();
};


const navbar = document.getElementById('myTopnav');
const sticky = navbar.offsetTop;
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNav() {
	if (window.pageYOffset >= sticky) {
		myTopnav.classList.add('sticky');
	} else {
		myTopnav.classList.remove('sticky');
	}
}
function myFunction() {
	const x = document.getElementById('tabs');
	if (x.className === 'tabs') {
		x.className += ' responsive';
	} else {
		x.className = 'tabs';
	}
}

