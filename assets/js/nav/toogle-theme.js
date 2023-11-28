$(document).ready(() => {
    localStorage.getItem("theme") ? null : localStorage.setItem("theme", "light");
    let theme = localStorage.getItem("theme");
    $(document.body).attr('data-bs-theme', theme);
});

$('.toogle-theme').on("click", (e) => {
    let theme = localStorage.getItem("theme");
    localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light' )
    theme = localStorage.getItem("theme");
    $(document.body).attr('data-bs-theme', theme);
    if (theme === 'dark') {
        $(e.target).attr('name', 'sunny-outline')
    } else {
        $(e.target).attr('name', 'moon-outline')
    }
});