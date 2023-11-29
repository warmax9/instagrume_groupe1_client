document.querySelector('.toogle-theme').addEventListener("click", (e) => {
    let theme = localStorage.getItem("theme");
    localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light')
    theme = localStorage.getItem("theme");
    document.body.setAttribute('data-bs-theme', theme);
    if (theme === 'dark') {
        e.target.setAttribute('name', 'sunny-outline')
    } else {
        e.target.setAttribute('name', 'moon-outline')
    }
})