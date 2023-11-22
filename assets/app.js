import "./styles/global.scss";

const $ = require('jquery');
require('bootstrap');


$('#switch').on("click", () => {
    const container = $('.auth__container');
    container.toggleClass("rounded-start rounded-end");
    container.toggleClass("left");
    $.ajax({
        url: '/register',
        method: 'GET',
        success: (data) => {
            container.html(data)
        },
        error: () => {
            console.error('failed')
        }
    })
});