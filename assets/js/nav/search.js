const searchInput = document.getElementById('search');

searchInput.addEventListener('input', async () => {
    const searchTerm = searchInput.value;
    const res = await fetch(`/userByTerm?searchTerm=${searchTerm}`);
    const data = await res.json();
    console.log(data);
})