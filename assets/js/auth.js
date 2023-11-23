const container = $('.auth__container');
let toggleAuth = false;

function switchAuth(url) {
    container.toggleClass("rounded-start rounded-end left");

    $.ajax({
        url: url,
        method: 'GET',
        success: (data) => {
            container.html(data);
            container.off("click", "#switch").on("click", "#switch", () => switchAuth(toggleAuth ? '/register' : '/login'));
        },
        error: () => {
            console.error('failed');
        }
    });
}

container.on("click", "#switch", () => switchAuth('/register'));
