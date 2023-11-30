const hamburger = document.querySelector('.nav__utils__hamburger');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle('opened');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('opened'))
    document.querySelector('.nav__links__items').classList.toggle('active')
})