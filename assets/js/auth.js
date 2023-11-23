const container = $('.auth__container');
let toggleAuth = false;

function switchAuth() {
    container.toggleClass("rounded-start rounded-end left");
    const url = toggleAuth ? '/register' : '/login';

    $.ajax({
        url: url,
        method: 'GET',
        success: (data) => {
            container.html(data);
            toggleAuth = !toggleAuth;
        },
        error: () => {
            console.error('failed');
        }
    });
}

$(document).ready(() => {
    switchAuth();
});

container.on("click", "#switch", () => switchAuth());
