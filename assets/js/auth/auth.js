const container = document.querySelector('.auth__container');
let toggleAuth = false;

function switchAuth() {
    container.classList.toggle("rounded-start");
    container.classList.toggle("rounded-end");
    container.classList.toggle("left");
    const url = toggleAuth ? '/register' : '/login';

    fetch('/auth' + url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            container.innerHTML = html;
            toggleAuth = !toggleAuth;
            setupSwitchButton();
        });
}

function setupSwitchButton() {
    const switchBtn = document.getElementById('switch');
    if (switchBtn) {
        switchBtn.addEventListener("click", switchAuth);
    }
}

switchAuth();