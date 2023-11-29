document.querySelector('.nav__utils__hamburger').addEventListener("click", (e) => {
    e.target.classList.toggle('opened');
    e.target.setAttribute('aria-expanded', e.target.classList.contains('opened'))
    document.querySelector('.nav__links__items').classList.toggle('active')
})