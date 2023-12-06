const searchInput = document.getElementById('search');
const userContainer = document.querySelector('.nav__utils__search__user')

searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value;
    if (searchTerm !== "") {
        const res = await fetch(`/userByTerm?searchTerm=${searchTerm}`);
        const data = await res.json();
        userContainer.innerHTML = "";
        data.forEach(user => {
            const userDiv = document.createElement('a');
            userDiv.classList.add('border', 'px-3', 'py-2', 'd-block')
            userDiv.href = `/user/${user.id}`
            userDiv.innerHTML = `
            <img src="http://127.0.0.1:3000/images/user/${user.photo}" alt="">
            <span class="username">${user.username}</span>
        `;

            userContainer.appendChild(userDiv);
        });
    } else {
        userContainer.innerHTML = "";
    }
})