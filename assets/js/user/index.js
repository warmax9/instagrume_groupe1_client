const btnBan = document.querySelectorAll('#btn-ban');
console.log(btnBan);
btnBan.forEach(btn => {
    btn.addEventListener('click', () => {
        let value = {
            "id": btn.dataset.id,
            "is_banned": btn.dataset.value
        }
        fetch('/user/ban/' + btn.dataset.id,
        {
            method: 'POST',
            body: JSON.stringify(value),
        }).then(() => {
            location.reload()
        })
    })
})