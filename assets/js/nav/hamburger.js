$('.nav__utils__hamburger').on("click", (e) => {
    e.target.classList.toggle('opened');
    e.target.setAttribute('aria-expanded', e.target.classList.contains('opened'))
})